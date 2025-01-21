import StudentManagement from "@/components/dashboard/student/student-manage";
import React from "react";

const page = () => {
  return (
    <div className='space-y-2 p-0'>
      <div className='mt-4 bg-white rounded-xl p-2'>
        <StudentManagement />
      </div>
    </div>
  );
};

export default page;
