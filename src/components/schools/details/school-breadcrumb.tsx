"use client";

import { ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadcrumbProps {
  name: string;
}

export function SchoolBreadcrumb({ name }: BreadcrumbProps) {
  return (
    <div className='bg-white border-b'>
      <div className='container mx-auto px-4 py-3'>
        <div className='flex items-center text-sm'>
          <Link
            href='/schools'
            className='text-emerald-600 text-xs md:text-sm hover:text-emerald-700 flex items-center'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Schools
          </Link>
          <ChevronRight className='w-4 h-4 mx-2 text-gray-400' />
          <span className='text-gray-600 text-xs md:text-sm'>{name}</span>
        </div>
      </div>
    </div>
  );
}
