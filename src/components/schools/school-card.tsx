"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { School } from "@/types/school";

export function SchoolCard({ school }: { school: School }) {
  const navigation = useRouter();
  return (
    <Card
      onClick={() => {
        navigation.push("/schools/elementary-school");
      }}
      className='overflow-hidden hover:shadow-lg cursor-pointer transition-shadow'>
      {/* Image */}
      <div className='relative h-48 sm:h-56'>
        <Image
          src={
            `data:image/jpeg;base64,${school.photo}` ||
            "/icons/school-placeholder.avif"
          }
          alt={school.name}
          fill
          className='object-cover'
        />
      </div>

      {/* Header */}
      <CardHeader>
        <div className='flex justify-between items-start'>
          <h3 className='font-semibold text-lg'>{school.name}</h3>
          <div className='flex items-center gap-1'>
            <span className='text-emerald-600'>★</span>
            <span>{school.ratings}</span>
          </div>
        </div>
        <h3 className=' font-medium text-sm'>{school.schoolCode}</h3>
      </CardHeader>

      {/* Content */}
      <CardContent>
        {/* Address with Icon */}
        <div className='flex items-center gap-2  text-gray-600'>
          <MapPin className='w-4 h-4 text-gray-400' />
          <p>{school.address}</p>
        </div>
        {/* Distance */}
        <p className='text-sm text-emerald-600 mt-2 font-bold'>
          {school.distanceAway}
        </p>
        {/* Additional Details */}
        <div className='mt-4'>
          <p className='text-sm text-gray-600'>
            <strong>Timing:</strong> {school.timing.start} - {school.timing.end}
          </p>
          <p className='text-sm text-gray-600 mt-2'>
            <strong>Board:</strong> {school.board}
          </p>
        </div>

        {/* Facilities */}
        <div className='mt-4 flex flex-wrap gap-2'>
          {school.amenities.map((facility, idx) => (
            <span
              key={idx}
              className='bg-emerald-100 text-emerald-600 text-xs font-medium py-1 px-3 rounded-full'>
              {facility}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
