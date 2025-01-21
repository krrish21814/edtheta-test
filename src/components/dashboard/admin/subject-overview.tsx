"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Book, Plus } from "lucide-react";

export const SubjectOverview = () => {
  const [selectedSemester, setSelectedSemester] = useState(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='bg-white p-6 rounded-xl shadow-sm'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-lg font-semibold text-gray-800'>
          Subjects & Courses
        </h2>
        <button className='flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors'>
          <Plus className='w-4 h-4' />
          Add Subject
        </button>
      </div>

      <div className='flex gap-2 mb-4'>
        {[1, 2, 3, 4].map((semester) => (
          <button
            key={semester}
            onClick={() => setSelectedSemester(semester)}
            className={`px-4 py-2 rounded-lg ${
              selectedSemester === semester
                ? "bg-emerald-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}>
            Semester {semester}
          </button>
        ))}
      </div>

      <div className='space-y-4'>
        <div className='p-4 border rounded-lg hover:bg-gray-50 transition-colors'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <Book className='w-5 h-5 text-emerald-600' />
              <div>
                <h3 className='font-medium'>Mathematics</h3>
                <p className='text-sm text-gray-500'>3 courses • Standard 1</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
