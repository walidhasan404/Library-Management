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
        "https://library-management-server-tau.vercel.app/jwt",
        { email },
        { withCredentials: true }
      );
      if (data.success) {
        localStorage.setItem("token", data.token);
        Swal.fire("Welcome back!", "", "success");
        navigate("/");
      }
    } catch {
      Swal.fire("Login failed", "Invalid credentials", "error");
    }
  };

  const handleCaptcha = (e) => {
    setCaptchaValid(validateCaptcha(e.target.value));
  };

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await googleSignIn();
      const { data } = await axios.post(
        "https://library-management-server-tau.vercel.app/jwt",
        { email: user.email },
        { withCredentials: true }
      );
      if (data.success) {
        localStorage.setItem("token", data.token);
        Swal.fire("Welcome back!", "", "success");
        navigate("/");
      }
    } catch {
      Swal.fire("Google sign‑in failed", "", "error");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-sky-300 via-indigo-200 to-purple-300 dark:from-gray-800 dark:via-gray-900 dark:to-black">
      {/* Blurred blobs */}
      <div className="absolute -top-44 -left-32 h-96 w-96 rounded-full bg-purple-400/70 blur-[120px]" />
      <div className="absolute -bottom-28 -right-32 h-96 w-96 rounded-full bg-sky-400/70 blur-[120px]" />

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/30 bg-white/20 p-10 backdrop-blur-xl shadow-2xl dark:bg-white/10">
        <h1 className="mb-8 text-center text-3xl font-extrabold text-gray-800 dark:text-gray-100">
          Sign in to <span className="text-indigo-500">LibraGenius</span>
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-sm">
          {/* Email */}
          <label className="relative block">
            <span className="absolute -top-2 left-3 bg-white/80 px-1 text-xs font-medium text-gray-600 dark:bg-gray-900/80 dark:text-gray-300">
              Email
            </span>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-300/40 bg-white/60 p-3 text-gray-800 placeholder-gray-500 outline-none transition focus:border-indigo-400 focus:bg-white dark:bg-black/40 dark:text-gray-200"
            />
            {errors.email && (
              <p className="text-red-500 mt-1">{errors.email.message}</p>
            )}
          </label>

          {/* Password */}
          <label className="relative block">
            <span className="absolute -top-2 left-3 bg-white/80 px-1 text-xs font-medium text-gray-600 dark:bg-gray-900/80 dark:text-gray-300">
              Password
            </span>
            <input
              type={showPass ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              placeholder="••••••••"
              className="w-full rounded-xl border border-gray-300/40 bg-white/60 p-3 pr-10 text-gray-800 placeholder-gray-500 outline-none transition focus:border-indigo-400 focus:bg-white dark:bg-black/40 dark:text-gray-200"
            />
            <span
              className="absolute top-3.5 right-4 text-gray-500 cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <IoMdEyeOff size={18} /> : <IoMdEye size={18} />}
            </span>
            {errors.password && (
              <p className="text-red-500 mt-1">{errors.password.message}</p>
            )}
          </label>

          {/* Captcha */}
          <div>
            <span className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">
              Captcha
            </span>
            <LoadCanvasTemplate />
            <input
              onBlur={handleCaptcha}
              name="captcha"
              placeholder="Enter the text above"
              className="mt-2 w-full rounded-xl border border-gray-300/40 bg-white/60 p-3 text-gray-800 placeholder-gray-500 outline-none transition focus:border-indigo-400 focus:bg-white dark:bg-black/40 dark:text-gray-200"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!captchaValid}
            className="w-full rounded-xl bg-indigo-500 py-3 font-semibold tracking-wide text-white shadow-lg transition hover:bg-indigo-600 disabled:pointer-events-none disabled:opacity-40"
          >
            Log in
          </button>

          {logError && (
            <p className="text-center text-sm text-red-500">{logError}</p>
          )}
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <hr className="flex-1 border-gray-300/50" />
          <span className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
            or
          </span>
          <hr className="flex-1 border-gray-300/50" />
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleSignIn}
          className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-white py-3 font-medium text-gray-700 shadow-lg transition hover:shadow-xl dark:bg-gray-900 dark:text-gray-200"
        >
          <FaGoogle className="text-[20px] text-[#EA4335] group-hover:scale-110 transition" />
          <span className="pr-2">Continue with Google</span>
        </button>

        {/* Extra */}
        <p className="mt-6 text-center text-sm text-gray-700 dark:text-gray-400">
          New here?
          <Link
            to="/signup"
            className="ml-1 font-semibold text-indigo-600 hover:underline"
          >
            Create account
          </Link>
        </p>

        {loggedInUser && (
          <button
            onClick={logOut}
            className="mt-4 w-full rounded-xl border border-red-400 bg-red-50 py-2 text-red-600 transition hover:bg-red-100 dark:bg-transparent dark:text-red-400"
          >
            Log out
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
