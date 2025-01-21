"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Bell } from "lucide-react";
import type { School } from "@/types/school";

interface AnnouncementsProps {
  school: School;
}

export function SchoolAnnouncements({ school }: AnnouncementsProps) {
  return (
    <div className='space-y-6'>
      {/* Latest Announcements */}
      <Card>
        <CardHeader>
          <CardTitle>Latest Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-6'>
            {school.announcements.map((announcement, index) => (
              <div
                key={index}
                className='border-b last:border-0 pb-6 last:pb-0'>
                <div className='flex items-start space-x-4'>
                  <div className='bg-emerald-100 p-2 rounded-lg'>
                    <Bell className='w-6 h-6 text-emerald-600' />
                  </div>
                  <div className='flex-1'>
                    <h3 className='font-semibold text-lg text-gray-900'>
                      {announcement.title}
                    </h3>
                    <div className='flex items-center text-sm text-gray-500 mt-1 mb-2'>
                      <Calendar className='w-4 h-4 mr-2' />
                      {announcement.date}
                    </div>
                    <p className='text-gray-600'>{announcement.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid md:grid-cols-2 gap-6'>
            {school.events.map((event, index) => (
              <Card key={index}>
                <CardContent className='p-4'>
                  <div className='flex items-start space-x-4'>
                    <div className='bg-emerald-100 px-3 py-2 rounded-lg text-center min-w-[4rem]'>
                      <div className='text-emerald-600 font-semibold'>
                        {new Date(event.date).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </div>
                    </div>
                    <div>
                      <h4 className='font-medium text-gray-900'>
                        {event.title}
                      </h4>
                      <p className='text-sm text-gray-600 mt-1'>
                        {event.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
