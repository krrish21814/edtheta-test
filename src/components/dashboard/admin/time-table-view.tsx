"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export const TimetableView = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");

  const timeSlots = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='mt-6 bg-white p-6 rounded-xl shadow-sm'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-lg font-semibold text-gray-800'>Class Timetable</h2>
        <div className='flex gap-4'>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className='px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent'>
            <option value=''>Select Class</option>
            <option value='1'>Standard 1</option>
            <option value='2'>Standard 2</option>
          </select>
          <select
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
            className='px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent'>
            <option value=''>Select Division</option>
            <option value='A'>Division A</option>
            <option value='B'>Division B</option>
          </select>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full border-collapse'>
          <thead>
            <tr>
              <th className='border p-3 bg-gray-50'>Time</th>
              {days.map((day) => (
                <th key={day} className='border p-3 bg-gray-50'>
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((time) => (
              <tr key={time}>
                <td className='border p-3 font-medium'>{time}</td>
                {days.map((day) => (
                  <td key={`${day}-${time}`} className='border p-3'>
                    <div className='min-h-[60px] flex items-center justify-center text-sm text-gray-500'>
                      Drop subject here
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
