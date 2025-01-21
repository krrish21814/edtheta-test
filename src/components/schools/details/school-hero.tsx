"use client";

import { MapPin, Star } from "lucide-react";

interface HeroProps {
  school: {
    name: string;
    address: string;
    rating: number;
    image: string;
  };
}

export function SchoolHero({ school }: HeroProps) {
  return (
    <div className='relative h-64 md:h-96 bg-emerald-900'>
      <img
        src={school.image}
        alt={school.name}
        className='w-full h-full object-cover opacity-50'
      />
      <div className='absolute inset-0 bg-gradient-to-t from-emerald-900/90 to-transparent' />
      <div className='absolute bottom-0 container mx-auto px-4 py-6'>
        <div className='flex flex-col md:flex-row md:items-end justify-between'>
          <div>
            <h1 className='text-3xl md:text-4xl font-bold text-white mb-2'>
              {school.name}
            </h1>
            <div className='flex items-center text-emerald-100 mb-2'>
              <MapPin className='w-4 h-4 mr-2' />
              {school.address}
            </div>
            <div className='flex items-center'>
              <Star className='w-5 h-5 text-yellow-400 fill-current' />
              <span className='ml-2 text-white'>{school.rating} / 5</span>
            </div>
          </div>
          <div className='mt-4 md:mt-0 flex space-x-4'>
            <button className='bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors'>
              Apply Now
            </button>
            <button className='bg-white hover:bg-gray-100 text-emerald-900 px-6 py-3 rounded-lg font-medium transition-colors'>
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
