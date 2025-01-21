/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent } from "@/components/ui/card";

export function SchoolGallery({ school }: { school: any }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {school.gallery.map((item: any, index: number) => (
        <Card key={index} className='overflow-hidden'>
          <img
            src={item.url}
            alt={item.caption}
            className='w-full h-64 object-cover'
          />
          <CardContent className='p-4'>
            <p className='text-gray-600'>{item.caption}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
