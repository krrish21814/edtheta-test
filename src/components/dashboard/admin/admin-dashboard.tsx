"use client";

import { ClassManagement } from "./class-management";
import { QuickStats } from "./quick-stats";
import { SubjectOverview } from "./subject-overview";
import { TimetableView } from "./time-table-view";

export const AdminDashboard = ({ initialStats }) => {
  return (
    <div className='p-6'>
      <QuickStats stats={initialStats} />
      <div className='mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <ClassManagement />
        <SubjectOverview />
      </div>
      <TimetableView />
    </div>
  );
};
