import { useForm } from "react-hook-form";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { API_ENDPOINTS } from "../../config/api";

const Login = () => {
  const { signIn, googleSignIn, logOut, loggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [logError, setLogError] = useState("");
  const [captchaValid, setCaptchaValid] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => loadCaptchaEnginge(6), []);

  const onSubmit = async ({ email, password }) => {
    if (password.length < 6)
      return setLogError("Password must be at least 6 characters.");
    if (!/[A-Z]/.test(password))
      return setLogError("Password needs 1 uppercase letter.");
    if (!/[a-z]/.test(password))
      return setLogError("Password needs 1 lowercase letter.");
    setLogError("");

    try {
      await signIn(email, password);
      const { data } = await axios.post(
        API_ENDPOINTS.JWT,
        { email, name: email.split('@')[0] },
        { withCredentials: true }
      );
      if (data.success) {
        localStorage.setItem("access-token", data.data.token);
        Swal.fire("Welcome back!", "", "success");
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire("Login failed", "Invalid credentials", "error");
    }
  };

  const handleCaptcha = (e) => {
    setCaptchaValid(validateCaptcha(e.target.value));
  };

  const handleGoogleSignIn = async () => {
    try {
      // Show loading state
      Swal.fire({
        title: 'Opening Google Sign-In...',
        text: 'Please wait while we open the Google sign-in window.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const { user } = await googleSignIn();
      
      // Close loading
      Swal.close();
      
      // Show success and process JWT
      const { data } = await axios.post(
        API_ENDPOINTS.JWT,
        { email: user.email, name: user.displayName || user.email.split('@')[0] },
        { withCredentials: true }
      );
      
      if (data.success) {
        localStorage.setItem("access-token", data.data.token);
        Swal.fire("Welcome back!", `Signed in as ${user.email}`, "success");
        navigate("/");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      
      // Close any open loading dialogs
      Swal.close();
      
      // Show specific error messages
      if (error.message.includes('Popup blocked')) {
        Swal.fire({
          title: 'Popup Blocked!',
          html: `
            <div class="text-left">
              <p>Your browser blocked the Google sign-in popup.</p>
              <br>
              <p><strong>To fix this:</strong></p>
              <ol class="list-decimal list-inside space-y-1 mt-2">
                <li>Click the popup blocker icon in your browser's address bar</li>
                <li>Select "Always allow popups from this site"</li>
                <li>Refresh the page and try again</li>
              </ol>
              <br>
              <p class="text-sm text-gray-600">Or try using a different browser.</p>
            </div>
          `,
          icon: 'warning',
          confirmButtonText: 'Try Again',
          showCancelButton: true,
          cancelButtonText: 'Cancel'
        }).then((result) => {
          if (result.isConfirmed) {
            // Retry after user acknowledges
            setTimeout(() => handleGoogleSignIn(), 1000);
          }
        });
      } else {
        Swal.fire("Google sign‑in failed", error.message || "Please try again", "error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  {...register("password", { required: "Password is required" })}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Captcha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Security Verification</label>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <LoadCanvasTemplate />
              </div>
              <input
                onBlur={handleCaptcha}
                name="captcha"
                placeholder="Enter the text above"
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!captchaValid}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Sign In
            </button>

            {logError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-red-600 text-sm text-center">{logError}</p>
              </div>
            )}
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <hr className="flex-1 border-gray-200" />
            <span className="text-sm font-medium text-gray-500">or continue with</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          {/* Google Sign-In */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 group"
          >
            <FaGoogle className="text-xl group-hover:scale-110 transition-transform" style={{color: '#4285F4'}} />
            <span>Continue with Google</span>
          </button>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </div>

          {loggedInUser && (
            <button
              onClick={logOut}
              className="mt-4 w-full bg-red-50 border border-red-200 text-red-600 py-2 px-4 rounded-xl font-medium hover:bg-red-100 transition-colors"
            >
              Log out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
