import { SchoolList } from "@/components/schools/school-list";

import SchoolSearch from "@/components/schools/search";

export default function SchoolsPage() {
  // Mock data for schools
  const schools = [
    {
      id: 1,
      name: "Greenfield International School",
      address: "1234 Elm Street, Springfield",
      rating: 4.5,
      distance: "3 km",
      image: "/school.jpg",
      timing: "8:00 AM - 3:00 PM",
      board: "CBSE",
      facilities: ["Library", "Sports", "Cafeteria", "Transport"],
    },
    {
      id: 2,
      name: "Springfield High",
      address: "5678 Oak Avenue, Springfield",
      rating: 4.2,
      distance: "5 km",
      image: "/school.jpg",
      timing: "7:30 AM - 2:30 PM",
      board: "ICSE",
      facilities: ["Library", "Laboratory", "Cafeteria"],
    },
    {
      id: 3,
      name: "Horizon Academy",
      address: "910 Maple Road, Springfield",
      rating: 4.7,
      distance: "2 km",
      image: "/school.jpg",
      timing: "9:00 AM - 4:00 PM",
      board: "IB",
      facilities: ["Sports", "Transport", "Smart Classes"],
    },
    {
      id: 4,
      name: "Riverdale Public School",
      address: "234 Willow Drive, Riverdale",
      rating: 4.3,
      distance: "7 km",
      image: "/school.jpg",
      timing: "8:30 AM - 3:30 PM",
      board: "CBSE",
      facilities: ["Library", "Cafeteria", "Sports"],
    },
  ];

  return (
    <div className='min-h-screen flex flex-col'>
      <main className='flex-1 bg-gray-50'>
        {/* Search Section */}
        <SchoolSearch />
        {/* Schools List */}
        <div className='container mx-auto px-4 py-8'>
          <SchoolList initialSchools={schools} />
        </div>
      </main>
    </div>
  );
}
