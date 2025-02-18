"use client";

import { useState, FormEvent, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Upload,
  ArrowRight,
  User,
  Mail,
  Lock,
  BookOpen,
  GraduationCap,
  UserCheck,
  Loader2,
} from "lucide-react";
import RegisterAction from "@/lib/actions/user/register";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student" as "admin" | "principal" | "teacher" | "student" | "parent",
    profilePhoto: null as File | null,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profilePhoto: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("password", formData.password);
    formDataToSubmit.append("role", formData.role);

    if (formData.profilePhoto) {
      formDataToSubmit.append("profilePhoto", formData.profilePhoto);
    }

    try {
      const response = await RegisterAction(formDataToSubmit);

      if (response.success) {
        setSuccess(response.message);
        setTimeout(() => {
          router.push("/schools/auth/login");
        }, 2000);
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.log(err);
      setError("Registration failed. Please try again.");
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
          <h1 className='text-4xl font-bold'>Welcome to Edtheta</h1>
          <p className='text-xl text-emerald-100 max-w-md'>
            Join our educational community and unlock your potential. Connect
            with teachers, students, and parents in a collaborative learning
            environment.
          </p>
          <div className='flex justify-center space-x-4 mt-8'>
            <BookOpen className='w-12 h-12 text-emerald-200' />
            <UserCheck className='w-12 h-12 text-emerald-200' />
          </div>
        </motion.div>
      </div>

      {/* Registration Form Container */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-12'>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='w-full max-w-md bg-white bg-opacity-90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-emerald-100/50'>
          <h2 className='text-3xl font-bold text-center text-emerald-700 mb-6 tracking-tight'>
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className='space-y-5'>
            {/* Profile Photo Upload */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='flex justify-center mb-4'>
              <div
                className='relative group cursor-pointer'
                onClick={triggerFileInput}>
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt='Profile Preview'
                    width={140}
                    height={140}
                    className='rounded-full object-cover border-4 border-emerald-200 shadow-lg'
                  />
                ) : (
                  <div className='w-[140px] h-[140px] bg-emerald-50 rounded-full flex items-center justify-center border-2 border-emerald-200'>
                    <Upload className='text-emerald-400 w-10 h-10' />
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  onChange={handleFileChange}
                  className='hidden'
                />
                <div className='absolute inset-0 bg-emerald-500 bg-opacity-0 group-hover:bg-opacity-20 rounded-full transition-all duration-300'></div>
              </div>
            </motion.div>

            {/* Input Fields */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className='space-y-4'>
              {/* Name Input */}
              <div className='relative group'>
                <div className='absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 group-hover:text-emerald-600'>
                  <User size={20} />
                </div>
                <input
                  type='text'
                  placeholder='Full Name'
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                  className='w-full p-3 pl-12 pr-4 border-2 border-emerald-100 rounded-xl focus:outline-none focus:border-emerald-500 transition-all duration-300 group-hover:border-emerald-300'
                />
              </div>

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

              {/* Role Select */}
              <div className='relative group'>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      role: e.target.value as
                        | "admin"
                        | "principal"
                        | "teacher"
                        | "student"
                        | "parent",
                    }))
                  }
                  className='w-full p-3 pl-4 pr-12 border-2 border-emerald-100 rounded-xl focus:outline-none focus:border-emerald-500 transition-all duration-300 group-hover:border-emerald-300 appearance-none'>
                  <option value='student'>Student</option>
                  <option value='teacher'>Teacher</option>
                  <option value='parent'>Parent</option>
                  <option value='principal'>Principal</option>
                </select>
                <ArrowRight className='absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 group-hover:text-emerald-600 pointer-events-none' />
              </div>
            </motion.div>

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
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight size={20} />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
