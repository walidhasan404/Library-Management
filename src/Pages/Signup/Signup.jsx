import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";


const Signup = () => {

    const { createUser,logOut } = useContext(AuthContext);
    const navigate=useNavigate();

    const handleSignUp = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const image = form.image.files[0];

        createUser(email, password, name, image)
            .then(result => {
                const user = result.user;
                console.log(user);
                logOut();
                navigate('/login');
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="p-8 m-6 bg-green-50">
            <h1 className="text-3xl text-center font-bold">Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name='name' placeholder="name" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="text" name='email' placeholder="email" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" name='password' placeholder="password" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Profile Image (Optional)</span>
                    </label>
                    <input type="file" name="image" accept="image/*" className="input input-bordered" />
                </div>
                <div className="form-control mt-6">
                    <input className="btn btn-accent bg-green-300" type="submit" value="Sign Up" />
                </div>
            </form>
            <p className='my-4 text-center'>Already Have an Account? <Link className='text-sky-700 font-bold' to="/login">Login</Link> </p>
        </div>
    );
};

export default Signup;