import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Swal from "sweetalert2";


const Signup = () => {
    const { createUser, logOut, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSignUp = event => {
        event.preventDefault();
        setLoading(true);
        
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const image = form.image.files[0];

        // Basic validation
        if (password.length < 6) {
            Swal.fire("Error", "Password must be at least 6 characters long", "error");
            setLoading(false);
            return;
        }

        createUser(email, password, name, image)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire("Success!", "Account created successfully! Please sign in.", "success");
                logOut();
                navigate('/login');
            })
            .catch(error => {
                console.log(error);
                Swal.fire("Error", "Failed to create account. Please try again.", "error");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const handleGoogleSignUp = async () => {
        try {
            setLoading(true);
            const result = await googleSignIn();
            if (result.user) {
                Swal.fire("Success!", "Account created successfully!", "success");
                navigate('/');
            }
        } catch (error) {
            console.error("Google sign-up error:", error);
            Swal.fire("Error", "Failed to sign up with Google. Please try again.", "error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h1>
                    <p className="text-gray-600 dark:text-gray-300">Join us and start your journey</p>
                </div>

                {/* Form Container */}
                <div className="bg-white dark:bg-slate-700 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-600 p-8">
                    {/* Form */}
                    <form onSubmit={handleSignUp} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-500 dark:bg-slate-600 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-300"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-500 dark:bg-slate-600 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-300"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPass ? "text" : "password"}
                                    name="password"
                                    placeholder="Create a password"
                                    className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-slate-500 dark:bg-slate-600 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-300"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100 transition-colors"
                                    onClick={() => setShowPass(!showPass)}
                                >
                                    {showPass ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Profile Image */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Profile Image (Optional)</label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-4">
                        <hr className="flex-1 border-gray-200 dark:border-slate-600" />
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">or continue with</span>
                        <hr className="flex-1 border-gray-200 dark:border-slate-600" />
                    </div>

                    {/* Google Sign-Up */}
                    <button
                        onClick={handleGoogleSignUp}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-600 border-2 border-gray-200 dark:border-slate-500 text-gray-700 dark:text-gray-200 py-3 px-4 rounded-xl font-medium shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-slate-400 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FaGoogle className="text-xl group-hover:scale-110 transition-transform" style={{color: '#4285F4'}} />
                        <span>Continue with Google</span>
                    </button>

                    {/* Sign In Link */}
                    <div className="text-center mt-6">
                        <p className="text-gray-600 dark:text-gray-400">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                            >
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;