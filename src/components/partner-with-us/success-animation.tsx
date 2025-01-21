"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const SuccessAnimation = ({ onClick }: { onClick: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    className='fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50'>
    <div className='text-center px-4'>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className='w-24 h-24 bg-emerald-100 rounded-full mx-auto mb-6 flex items-center justify-center'>
        <Check className='w-12 h-12 text-emerald-600' />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className='text-2xl md:text-3xl font-bold text-gray-800 mb-4'>
        Registration Successful!
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className='text-gray-600 mb-2'>
        Thank you for partnering with us.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className='text-gray-600'>
        We will get in touch with you within 2 business days to complete the
        verification process.
      </motion.p>
      <motion.button
        onClick={onClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className='text-white mt-4 bg-emerald-600 px-4 py-2 rounded-md'>
        Explore
      </motion.button>
    </div>
  </motion.div>
);

export default SuccessAnimation;
