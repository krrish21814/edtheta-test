"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck } from "lucide-react";
import type { School } from "@/types/school";

interface StatsProps {
  school: School;
}

export function SchoolStats({ school }: StatsProps) {
  return (
    <Card className='bg-emerald-50'>
      <CardContent className='p-6'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
          <div>
            <div className='text-3xl font-bold text-emerald-700'>
              {school.studentCount}+
            </div>
            <div className='text-sm text-emerald-600'>Students</div>
          </div>
          <div>
            <div className='text-3xl font-bold text-emerald-700'>
              {school.teacherCount}+
            </div>
            <div className='text-sm text-emerald-600'>Teachers</div>
          </div>
          <div>
            <div className='text-3xl font-bold text-emerald-700'>
              {school.facilities.length}+
            </div>
            <div className='text-sm text-emerald-600'>Facilities</div>
          </div>
          <div>
            <div className='text-3xl font-bold text-emerald-700'>
              {school.accreditations.length}
            </div>
            <div className='text-sm text-emerald-600'>Accreditations</div>
          </div>
        </div>
        <div className='mt-6'>
          <div className='flex flex-wrap gap-2'>
            {school.accreditations.map((accreditation, index) => (
              <div
                key={index}
                className='flex items-center bg-emerald-100 px-3 py-1 rounded-full'>
                <BadgeCheck className='w-4 h-4 text-emerald-600 mr-2' />
                <span className='text-sm text-emerald-700'>
                  {accreditation}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
