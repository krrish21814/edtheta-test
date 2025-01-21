"use client";

import { motion } from "framer-motion";

export const SchoolProfile = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='bg-white rounded-xl shadow-sm overflow-hidden'>
      <div className='h-48 bg-emerald-600'>{/* School Banner Image */}</div>
      <div className='p-6 flex items-start flex-col md:flex-row gap-6'>
        <div className='w-24 h-24 bg-white rounded-xl shadow-lg -mt-12 flex items-center justify-center'>
          <img src='/school.jpg' className='h-24 w-24 rounded-xl' />
        </div>
        <div>
          <h1 className='text-2xl font-bold text-gray-800'>
            Edtheta International School
          </h1>
          <p className='text-gray-500 mt-1'>
            Excellence in Education Since 1995
          </p>
          <div className='flex flex-col md:flex-row gap-4 mt-4'>
            <div>
              <p className='text-sm text-gray-500'>Location</p>
              <p className='font-medium'>New York, USA</p>
            </div>
            <div>
              <p className='text-sm text-gray-500'>Accreditation</p>
              <p className='font-medium'>IB World School</p>
            </div>
            <div>
              <p className='text-sm text-gray-500'>Website</p>
              <a
                href='http://localhost:3000/schools/edtheta-international-school'
                target='_blank'>
                <p className='font-medium underline text-emerald-600 cursor-pointer'>
                  www.edtheta.com/schools/edtheta-international-school
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
