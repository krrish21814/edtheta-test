import { SchoolList } from "@/components/schools/school-list";
import SchoolSearch from "@/components/schools/search";

export default async function SchoolsPage() {
  return (
    <div className='min-h-screen flex flex-col'>
      <main className='flex-1 bg-gray-50'>
        {/* Search Section */}
        <SchoolSearch />
        {/* Schools List */}
        <div className='container mx-auto px-4 py-8'>
          <SchoolList />
        </div>
      </main>
    </div>
  );
}
