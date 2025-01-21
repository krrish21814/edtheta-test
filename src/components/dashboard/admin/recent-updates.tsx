"use client";

import { motion } from "framer-motion";
import { Calendar, Users, Award } from "lucide-react";

export const RecentUpdates = () => {
  const updates = [
    {
      icon: Calendar,
      title: "Final Exam Schedule Released",
      description: "The schedule for final examinations has been published.",
      time: "2 hours ago",
    },
    {
      icon: Users,
      title: "New Faculty Orientation",
      description:
        "Orientation session for new teachers scheduled for next week.",
      time: "5 hours ago",
    },
    {
      icon: Award,
      title: "Academic Excellence Awards",
      description: "Annual awards ceremony scheduled for next month.",
      time: "1 day ago",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='bg-white rounded-xl shadow-sm p-6'>
      <h2 className='text-lg font-semibold text-gray-800 mb-4'>
        Recent Updates
      </h2>
      <div className='space-y-4'>
        {updates.map((update, index) => (
          <div
            key={index}
            className='flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors'>
            <div className='p-2 bg-emerald-100 rounded-lg'>
              <update.icon className='w-5 h-5 text-emerald-600' />
            </div>
            <div className='flex-1'>
              <h3 className='font-medium text-gray-800'>{update.title}</h3>
              <p className='text-sm text-gray-500 mt-1'>{update.description}</p>
              <p className='text-xs text-gray-400 mt-2'>{update.time}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
