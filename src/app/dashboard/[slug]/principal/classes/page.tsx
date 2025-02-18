import ClassesManagement from "@/components/dashboard/classes/classes-management";
import { dummyData } from "@/lib/utils";
import React from "react";

const ClassesPage = () => {
  return (
    <div className='space-y-6 p-6'>
      <div className='mt-4 bg-white rounded-xl p-6'>
        <ClassesManagement initialClasses={dummyData} />
      </div>
    </div>
  );
};
export default ClassesPage;
