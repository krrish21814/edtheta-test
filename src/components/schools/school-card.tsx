import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

export interface SchoolCardProps {
  name: string;
  address: string;
  rating: number;
  distance: string;
  image: string;
  timing: string;
  board: string;
  facilities: string[];
}

export function SchoolCard({
  name,
  address,
  rating,
  distance,
  image,
  timing,
  board,
  facilities,
}: SchoolCardProps) {
  const navigation = useRouter();
  return (
    <Card
      onClick={() => {
        navigation.push("/schools/elementary-school");
      }}
      className='overflow-hidden hover:shadow-lg cursor-pointer transition-shadow'>
      {/* Image */}
      <div className='relative h-48 sm:h-56'>
        <Image src={image} alt={name} fill className='object-cover' />
      </div>

      {/* Header */}
      <CardHeader>
        <div className='flex justify-between items-start'>
          <h3 className='font-semibold text-lg'>{name}</h3>
          <div className='flex items-center gap-1'>
            <span className='text-emerald-600'>★</span>
            <span>{rating}</span>
          </div>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent>
        {/* Address with Icon */}
        <div className='flex items-center gap-2  text-gray-600'>
          <MapPin className='w-4 h-4 text-gray-400' />
          <p>{address}</p>
        </div>
        {/* Distance */}
        <p className='text-sm text-emerald-600 mt-2 font-bold'>
          {distance} away
        </p>
        {/* Additional Details */}
        <div className='mt-4'>
          <p className='text-sm text-gray-600'>
            <strong>Timing:</strong> {timing}
          </p>
          <p className='text-sm text-gray-600 mt-2'>
            <strong>Board:</strong> {board}
          </p>
        </div>

        {/* Facilities */}
        <div className='mt-4 flex flex-wrap gap-2'>
          {facilities.map((facility, idx) => (
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
