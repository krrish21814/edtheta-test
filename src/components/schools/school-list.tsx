"use client";

import { useEffect, useState } from "react";
import { SchoolCard } from "./school-card";
import { SchoolFilters } from "./school-filter";
import { Pagination } from "@/components/ui/pagination";
import SchoolListServer from "@/lib/actions/school/school-list";
import { School } from "@/types/school";
import Loading from "./loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function SchoolList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [schools, setSchools] = useState<School[]>([]);

  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [apiLoading, setApiLoading] = useState(false);

  const handleGetSchools = async (lat: number, lng: number, radius: number) => {
    setApiLoading(true);
    try {
      const schoolsData = await SchoolListServer({
        latitude: lat,
        longitude: lng,
        radius: radius,
        limit: 10,
        page: currentPage,
      });
      if (schoolsData.success && schoolsData.data) {
        setSchools(schoolsData.data.data);
        setCurrentPage(schoolsData.data.pagination.currentPage);
        setTotalPages(schoolsData.data.pagination.totalPages);
      } else {
        toast.error(schoolsData.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setApiLoading(false);
    }
  };
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          handleGetSchools(
            position.coords.latitude,
            position.coords.longitude,
            5
          );
          setIsLoadingLocation(false);
        },
        () => {
          setIsLoadingLocation(false);
        }
      );
    }
  }, []);

  return apiLoading || isLoadingLocation ? (
    <Loading />
  ) : (
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
            {schools.length > 0 &&
              schools.map((school, idx) => (
                <SchoolCard key={idx} school={school} />
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
