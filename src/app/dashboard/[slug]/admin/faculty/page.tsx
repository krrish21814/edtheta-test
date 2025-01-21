// FacultyPage.tsx (Server-side)

import { QuickStats } from "@/components/dashboard/admin/quick-stats";
import { FacultySection } from "@/components/dashboard/faculty/faculty-section";

const FacultyPage = () => {
  const facultyData = [
    {
      id: "1",
      name: "Dr. Rose Diva",
      title: "Professor",
      department: "Math",
      bio: "A passionate educator.",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1661942126259-fb08e7cce1e2",
    },
    {
      id: "2",
      name: "Dr. Jane Smith",
      title: "Assistant Professor",
      department: "Science",
      bio: "An expert in chemistry.",
      imageUrl: "https://images.unsplash.com/photo-1664382953518-4a664ab8a8c9",
    },
  ];

  return (
    <div className='space-y-6 p-6'>
      <QuickStats />
      <div className='mt-4 bg-white rounded-xl p-6'>
        <FacultySection faculty={facultyData} />
      </div>
    </div>
  );
};

export default FacultyPage;
