// FacultyPage.tsx (Server-side)

import { QuickStats } from "@/components/dashboard/admin/quick-stats";
import { FacultySection } from "@/components/dashboard/faculty/faculty-section";
import FacultyStatsAction from "@/lib/actions/school/faculty-stats";
import UserGetAction from "@/lib/actions/user/user";

export default async function FacultyPage() {
  const user = await UserGetAction();
  const facultStatsData = await FacultyStatsAction(user?.school_slug || "");

  return (
    <div className='space-y-6 p-6'>
      {facultStatsData.data ? (
        <QuickStats stats={facultStatsData.data} />
      ) : (
        <h3 className='text-red-400 text-center'>
          Could not load faculty stats
        </h3>
      )}
      <div className='mt-4 bg-white rounded-xl p-6'>
        <FacultySection />
      </div>
    </div>
  );
}
