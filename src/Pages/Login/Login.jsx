import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from "axios";
import { FaGoogle } from 'react-icons/fa';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';

const Login = () => {
    const { loggedInUser, signIn, googleSignIn, logOut } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [logError, setLogError] = useState('');
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        if (password.length < 6) {
            setLogError('Password should be at least 6 characters or longer');
            return;
        } else if (!/[A-Z]/.test(password)) {
            setLogError('Password should contain at least 1 capital letter');
            return;
        } else if (!/[a-z]/.test(password)) {
            setLogError('Password should contain at least 1 lowercase letter');
            return;
        }

        signIn(email, password)
            .then(result => {
                const loggedInUser = result.user;
                const user = { email };
                axios.post('https://library-management-server-tau.vercel.app/jwt', user, { withCredentials: true })
                    .then(res => {
                        if (res.data.success) {
                            localStorage.setItem('token', res.data.token);  // Store token
                            navigate('/');
                        }
                    });

                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'Welcome back!',
                    confirmButtonText: 'OK'
                });
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Invalid email or password. Please try again.',
                    confirmButtonText: 'OK'
                });
            });
    };



    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                const user = { email: loggedInUser.email };
                axios.post('https://library-management-server-tau.vercel.app/jwt', user, { withCredentials: true })
                    .then(res => {
                        console.log(res.data);
                        if (res.data.success) {
                        }
                    });

                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'Welcome back!',
                    confirmButtonText: 'OK'
                });
                navigate('/');
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Failed to login with Google. Please try again.',
                    confirmButtonText: 'OK'
                });
            });
    };

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };

    return (
        <div className="p-8 m-6 bg-sky-50">
            <h1 className="text-3xl text-center font-bold">Login</h1>
            <form onSubmit={handleLogin}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name='email' placeholder="email" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" name='password' placeholder="password" className="input input-bordered" />
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label">
                        <LoadCanvasTemplate />
                    </label>
                    <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="type the captcha above" className="input input-bordered" />
                </div>
                <div className="form-control mt-6">
                    <input disabled={disabled} className="btn btn-primary bg-sky-600" type="submit" value="Login" />
                </div>
            </form>
            <p className='my-4 text-center'>New to LibraGenius <Link className='text-lime-600 font-bold' to="/signup">Sign Up</Link> </p>
            {logError && <p className="text-red-500 text-center">{logError}</p>}
            <div className='text-center'>
                <h2 className="text-lg font-medium text-center">LogIn With</h2>
                <div>
                    <button className="btn btn-outline mr-2" onClick={handleGoogleSignIn}>
                        <FaGoogle />
                    </button>
                </div>
            </div>
            {loggedInUser && <button onClick={logOut}>Log Out</button>}
        </div>
    );
};

export default Login;
