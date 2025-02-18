"use client";

import Loading from "@/components/schools/loading";
import SchoolProfileGetAction from "@/lib/actions/school/school-profile";
import UserGetAction from "@/lib/actions/user/user";
import { School } from "@/types/school";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export const SchoolProfile = () => {
  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetSchool = async () => {
    try {
      setLoading(true);
      const user = await UserGetAction();
      const schoolData = await SchoolProfileGetAction(user?.school_slug || "");
      setSchool(schoolData.data || null);
    } catch {
      setSchool(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetSchool();
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='bg-white rounded-xl shadow-sm overflow-hidden'>
      <div className='h-48 bg-emerald-600'>{/* School Banner Image */}</div>
      <div className='p-6 flex items-start flex-col md:flex-row gap-6'>
        <div className='w-24 h-24 bg-white rounded-xl shadow-lg -mt-12 flex items-center justify-center'>
          <img
            src={
              school
                ? `data:image/jpeg;base64,${school?.photo}`
                : "/icons/school-placeholder.avif"
            }
            className='h-24 w-24 rounded-xl'
          />
        </div>
        <div>
          <h1 className='text-2xl font-bold text-gray-800'>{school?.name}</h1>
          <p className='text-gray-500 mt-1'>{school?.description}</p>
          <div className='flex flex-col md:flex-row gap-4 mt-4'>
            <div>
              <p className='text-sm text-gray-500'>Location</p>
              <p className='font-medium'>{school?.address}</p>
            </div>
            <div>
              <p className='text-sm text-gray-500'>Board</p>
              <p className='font-medium'>{school?.board}</p>
            </div>
            <div>
              <p className='text-sm text-gray-500'>Website</p>
              <Link href={school?.website || ""} target='_blank'>
                <p className='font-medium underline text-emerald-600 cursor-pointer'>
                  {school?.website ||
                    `https://localhost:3000/schools/${school?.slug}`}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
