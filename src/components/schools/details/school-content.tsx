/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SchoolAnnouncements } from "./tabs/school-announcement";
import { SchoolGallery } from "./tabs/school-gallery";
import { SchoolAdmissions } from "./tabs/school-admission";
import { SchoolAcademics } from "./tabs/school-academic";
import { SchoolOverview } from "./tabs/school-overview";
import { SchoolStats } from "./tabs/school-stats";
import { SchoolPosts } from "./tabs/school-posts";
import { useState, useEffect } from "react";

interface ContentProps {
  school: any; // Use proper type from your data model
}

export function SchoolContent({ school }: ContentProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedTab, setSelectedTab] = useState("posts");

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTab(e.target.value);
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      {isMobile ? (
        <select
          value={selectedTab}
          onChange={handleSelectChange}
          className='bg-white p-2 border rounded-lg w-full focus:outline-none'>
          <option value='posts'>Posts</option>
          <option value='overview'>Overview</option>
          <option value='academics'>Academics</option>
          <option value='admissions'>Admissions</option>
          <option value='gallery'>Gallery</option>
          <option value='announcements'>Updates</option>
          <option value='statistics'>Demography</option>
        </select>
      ) : (
        <Tabs defaultValue='posts' className='space-y-6'>
          <TabsList className='bg-white p-1 rounded-lg border'>
            <TabsTrigger value='posts' className='p-2 mx-1'>
              Posts
            </TabsTrigger>
            <TabsTrigger value='overview' className='p-2 mx-1'>
              Overview
            </TabsTrigger>
            <TabsTrigger value='academics' className='p-2 mx-1'>
              Academics
            </TabsTrigger>
            <TabsTrigger value='admissions' className='p-2 mx-1'>
              Admissions
            </TabsTrigger>
            <TabsTrigger value='gallery' className='p-2 mx-1'>
              Gallery
            </TabsTrigger>
            <TabsTrigger value='announcements' className='p-2 mx-1'>
              Updates
            </TabsTrigger>
            <TabsTrigger value='statistics' className='p-2 mx-1'>
              Demography
            </TabsTrigger>
          </TabsList>

          <TabsContent value='posts'>
            <SchoolPosts school={school} />
          </TabsContent>
          <TabsContent value='overview'>
            <SchoolOverview school={school} />
          </TabsContent>
          <TabsContent value='academics'>
            <SchoolAcademics school={school} />
          </TabsContent>
          <TabsContent value='admissions'>
            <SchoolAdmissions school={school} />
          </TabsContent>
          <TabsContent value='gallery'>
            <SchoolGallery school={school} />
          </TabsContent>
          <TabsContent value='announcements'>
            <SchoolAnnouncements school={school} />
          </TabsContent>
          <TabsContent value='statistics'>
            <SchoolStats school={school} />
          </TabsContent>
        </Tabs>
      )}

      {/* Dynamically show content based on the selected tab in mobile view */}
      {isMobile && (
        <div className='mt-4'>
          {selectedTab === "posts" && <SchoolPosts school={school} />}
          {selectedTab === "overview" && <SchoolOverview school={school} />}
          {selectedTab === "academics" && <SchoolAcademics school={school} />}
          {selectedTab === "admissions" && <SchoolAdmissions school={school} />}
          {selectedTab === "gallery" && <SchoolGallery school={school} />}
          {selectedTab === "announcements" && (
            <SchoolAnnouncements school={school} />
          )}
          {selectedTab === "statistics" && <SchoolStats school={school} />}
        </div>
      )}
    </div>
  );
}
