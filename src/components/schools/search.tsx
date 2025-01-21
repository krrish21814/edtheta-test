"use client";
import { MapPin, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../button";
import { Input } from "../ui/input";

const SchoolSearch = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  console.log(location);
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLoadingLocation(false);
        },
        () => {
          setIsLoadingLocation(false);
        }
      );
    }
  }, []);

  return (
    <div className='bg-emerald-600 py-8 sm:py-12'>
      <div className='container mx-auto px-4'>
        <h1 className='text-3xl sm:text-4xl font-bold text-white text-center mb-6 sm:mb-8'>
          Find Schools Near You
        </h1>
        <div className='max-w-2xl mx-auto flex flex-col sm:flex-row gap-4'>
          <div className='flex-1 relative'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
            <Input
              placeholder='Search schools...'
              className='pl-10 focus:ring-0 ring-0 outline-none focus:outline-none focus-visible:ring-0 focus-visible:outline-none'
            />
          </div>
          <Button
            variant='secondary'
            className='flex items-center gap-2'
            disabled={isLoadingLocation}>
            <MapPin size={18} />
            {isLoadingLocation ? "Locating..." : "Change Location"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SchoolSearch;
