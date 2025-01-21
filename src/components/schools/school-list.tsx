"use client";

import { useState } from "react";
import { SchoolCard } from "./school-card";
import { SchoolFilters } from "./school-filter";
import { Pagination } from "@/components/ui/pagination";

interface SchoolCardProps {
  name: string;
  address: string;
  rating: number;
  distance: string;
  image: string;
  timing: string;
  board: string;
  facilities: string[];
}

interface SchoolListProps {
  initialSchools: SchoolCardProps[];
}

export function SchoolList({ initialSchools }: SchoolListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [schools] = useState(initialSchools);
  const schoolsPerPage = 9;
  const totalPages = Math.ceil(schools.length / schoolsPerPage);

  const getCurrentSchools = () => {
    const start = (currentPage - 1) * schoolsPerPage;
    const end = start + schoolsPerPage;
    return schools.slice(start, end);
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 h-full'>
      {/* Filters */}
      <div className='lg:col-span-1'>
        <SchoolFilters />
      </div>

      {/* Schools and Pagination */}
      <div className='lg:col-span-3 flex flex-col h-full'>
        {/* Schools list */}
        <div className='flex-grow'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {getCurrentSchools().map((school, idx) => (
              <SchoolCard key={idx} {...school} />
            ))}
          </div>
        </div>

        {/* Pagination aligned at the bottom */}
        <div className='mt-6'>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
