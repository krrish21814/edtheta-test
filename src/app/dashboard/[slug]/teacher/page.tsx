import { RecentUpdates } from "@/components/dashboard/admin/recent-updates";
import { SchoolProfile } from "@/components/dashboard/admin/school-profile";
import { StatsOverview } from "@/components/dashboard/admin/stats-overview";
import { getSchoolStats } from "@/lib/stats";
import { Suspense } from "react";

async function StatsOverviewWrapper() {
  const stats = await getSchoolStats();
  return <StatsOverview stats={stats} />;
}

export default function AdminHomePage() {
  return (
    <div className='p-6 space-y-6'>
      <SchoolProfile />
      <Suspense fallback={<div>Loading stats...</div>}>
        <StatsOverviewWrapper />
      </Suspense>
      <RecentUpdates />
    </div>
  );
}
