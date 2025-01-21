/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getStatsConfig } from "@/lib/stats";
import { motion } from "framer-motion";

export const QuickStats = () => {
  const stats = getStatsConfig("admin");
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {stats.map((stat: any, index: number) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className='bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-500 text-sm'>{stat.label}</p>
              <p className='text-2xl font-semibold text-gray-800 mt-1'>
                {stat.value}
              </p>
            </div>
            <div className='p-3 bg-emerald-100 rounded-full'>
              <stat.icon className='w-6 h-6 text-emerald-600' />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
