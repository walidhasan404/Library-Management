import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from "axios";
import { FaGoogle } from 'react-icons/fa';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';

const Login = () => {
    const { loggedInUser, signIn, googleSignIn, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const [logError, setLogError] = useState('');
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        if (password.length < 6) {
            setLogError('Password should be at least 6 characters long.');
            return;
        } else if (!/[A-Z]/.test(password)) {
            setLogError('Password should contain at least 1 uppercase letter.');
            return;
        } else if (!/[a-z]/.test(password)) {
            setLogError('Password should contain at least 1 lowercase letter.');
            return;
        }

        try {
            const result = await signIn(email, password);
            const user = { email };
            const res = await axios.post('https://library-management-server-tau.vercel.app/jwt', user, { withCredentials: true });

            if (res.data.success) {
                localStorage.setItem('token', res.data.token);
                navigate('/');
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'Welcome back!',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Invalid email or password. Please try again.',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await googleSignIn();
            const user = { email: result.user.email };
            const res = await axios.post('https://library-management-server-tau.vercel.app/jwt', user, { withCredentials: true });

            if (res.data.success) {
                localStorage.setItem('token', res.data.token);
                navigate('/');
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'Welcome back!',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Failed to login with Google. Please try again.',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        setDisabled(!validateCaptcha(user_captcha_value));
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h1>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="form-control">
                        <label className="label text-gray-600 font-medium">Email</label>
                        <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label text-gray-600 font-medium">Password</label>
                        <input type="password" name="password" placeholder="Password" className="input input-bordered" required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label text-gray-600 font-medium">Captcha</label>
                        <LoadCanvasTemplate />
                        <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="Type the captcha above" className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className={`btn btn-primary w-full ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={disabled}>
                            Login
                        </button>
                    </div>
                </form>
                {logError && <p className="text-red-500 text-center mt-4">{logError}</p>}
                <p className="my-4 text-center text-gray-600">New to LibraGenius? <Link className="text-blue-600 font-semibold" to="/signup">Sign Up</Link></p>
                <div className="text-center">
                    <h2 className="text-lg font-medium text-gray-800 mb-4">Or Log In With</h2>
                    <button className="btn btn-outline btn-primary" onClick={handleGoogleSignIn}>
                        <FaGoogle className="mr-2" /> Google
                    </button>
                </div>
                {loggedInUser && <button onClick={logOut} className="btn btn-secondary w-full mt-4">Log Out</button>}
            </div>
        </div>
    );
};

export default Login;
