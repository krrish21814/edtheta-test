"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Mail,
  Lock,
  GraduationCap,
  BookOpen,
  UserCheck,
  Loader2,
} from "lucide-react";
// import UserServer from "@/lib/actions/user/login";
import Link from "next/link";
import LoginAction from "@/lib/actions/user/login";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("password", formData.password);

    try {
      const response = await LoginAction(formDataToSubmit);
      if (response.success) {
        setSuccess(response.message);
        setTimeout(() => {
          router.push(`/?token=${response.data?.access_token}`);
        }, 2000);
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.log("error bro",err);
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-emerald-50 to-emerald-100'>
      {/* Educational Patterns Sidebar (Web) */}
      <div className='hidden lg:flex lg:w-1/2 bg-emerald-600 items-center justify-center relative overflow-hidden p-12'>
        <div className='absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-800 opacity-90'></div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className='relative z-10 text-white text-center space-y-6'>
          <GraduationCap size={100} className='mx-auto text-emerald-200' />
          <h1 className='text-4xl font-bold'>Welcome Back to Edtheta</h1>
          <p className='text-xl text-emerald-100 max-w-md'>
            Continue your learning journey. Access personalized educational
            resources and connect with your school community.
          </p>
          <div className='flex justify-center space-x-4 mt-8'>
            <BookOpen className='w-12 h-12 text-emerald-200' />
            <UserCheck className='w-12 h-12 text-emerald-200' />
          </div>
        </motion.div>
      </div>

      {/* Login Form Container */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-12'>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='w-full max-w-md bg-white bg-opacity-90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-emerald-100/50'>
          <h2 className='text-3xl font-bold text-center text-emerald-700 mb-6 tracking-tight'>
            Login to Edtheta
          </h2>

          <form onSubmit={handleSubmit} className='space-y-5'>
            {/* Input Fields */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className='space-y-4'>
              {/* Email Input */}
              <div className='relative group'>
                <div className='absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 group-hover:text-emerald-600'>
                  <Mail size={20} />
                </div>
                <input
                  type='email'
                  placeholder='Email Address'
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                  className='w-full p-3 pl-12 pr-4 border-2 border-emerald-100 rounded-xl focus:outline-none focus:border-emerald-500 transition-all duration-300 group-hover:border-emerald-300'
                />
              </div>

              {/* Password Input */}
              <div className='relative group'>
                <div className='absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 group-hover:text-emerald-600'>
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder='Password'
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  required
                  className='w-full p-3 pl-12 pr-12 border-2 border-emerald-100 rounded-xl focus:outline-none focus:border-emerald-500 transition-all duration-300 group-hover:border-emerald-300'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500 hover:text-emerald-700'>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </motion.div>

            {/* Forgot Password Link */}
            <div className='text-right'>
              <Link
                href='/schools/auth/forgot-password'
                className='text-sm text-emerald-600 hover:text-emerald-800 transition-colors'>
                Forgot Password?
              </Link>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className='text-red-500 text-sm text-center'>
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className='text-emerald-600 text-sm text-center'>
                  {success}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type='submit'
              disabled={isLoading}
              className='w-full bg-emerald-500 text-white py-3 rounded-xl hover:bg-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed'>
              {isLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  <span>Logging In...</span>
                </>
              ) : (
                <>
                  <span>Login</span>
                  <ArrowRight size={20} />
                </>
              )}
            </motion.button>

            {/* Register Link */}
            <div className='text-center text-sm mt-4 gap-2'>
              Don&apos;t have an account?&nbsp;
              <Link
                href='/schools/auth/signup'
                className='text-emerald-600 hover:text-emerald-800 font-semibold transition-colors'>
                Create Account
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
