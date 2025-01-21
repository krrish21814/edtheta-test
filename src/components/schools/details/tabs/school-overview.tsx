/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  GraduationCap,
  Award,
  Clock,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function SchoolOverview({ school }: { school: any }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      <div className='md:col-span-2 space-y-6'>
        <Card>
          <CardHeader>
            <CardTitle>About the School</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-gray-600'>{school.description}</p>
            <div className='mt-6 grid grid-cols-2 gap-4'>
              <div>
                <h4 className='font-medium text-gray-700'>Founded</h4>
                <p className='text-gray-600'>{school.founded}</p>
              </div>
              <div>
                <h4 className='font-medium text-gray-700'>Board</h4>
                <p className='text-gray-600'>{school.board}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Statistics */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <Card className='bg-emerald-50'>
            <CardContent className='p-4'>
              <Users className='w-8 h-8 text-emerald-600 mb-2' />
              <div className='text-2xl font-bold text-emerald-900'>
                {school.studentCount}
              </div>
              <div className='text-sm text-emerald-700'>Students</div>
            </CardContent>
          </Card>
          <Card className='bg-emerald-50'>
            <CardContent className='p-4'>
              <GraduationCap className='w-8 h-8 text-emerald-600 mb-2' />
              <div className='text-2xl font-bold text-emerald-900'>
                {school.teacherCount}
              </div>
              <div className='text-sm text-emerald-700'>Teachers</div>
            </CardContent>
          </Card>
          <Card className='bg-emerald-50'>
            <CardContent className='p-4'>
              <Users className='w-8 h-8 text-emerald-600 mb-2' />
              <div className='text-2xl font-bold text-emerald-900'>
                1:{school.classSize}
              </div>
              <div className='text-sm text-emerald-700'>Teacher Ratio</div>
            </CardContent>
          </Card>
          <Card className='bg-emerald-50'>
            <CardContent className='p-4'>
              <Award className='w-8 h-8 text-emerald-600 mb-2' />
              <div className='text-2xl font-bold text-emerald-900'>
                {school.board}
              </div>
              <div className='text-sm text-emerald-700'>Board</div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Graph */}
        <Card>
          <CardHeader>
            <CardTitle>School Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='h-80'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={school.performanceData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='year' />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey='academics' fill='#059669' name='Academics' />
                  <Bar dataKey='sports' fill='#10B981' name='Sports' />
                  <Bar dataKey='activities' fill='#34D399' name='Activities' />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className='space-y-6'>
        {/* Quick Info */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Information</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center'>
              <Clock className='w-5 h-5 text-emerald-600 mr-3' />
              <div>
                <div className='text-sm font-medium'>School Hours</div>
                <div className='text-sm text-gray-600'>{school.timing}</div>
              </div>
            </div>
            <div className='flex items-center'>
              <Phone className='w-5 h-5 text-emerald-600 mr-3' />
              <div>
                <div className='text-sm font-medium'>Contact</div>
                <div className='text-sm text-gray-600'>{school.phone}</div>
              </div>
            </div>
            <div className='flex items-center'>
              <Mail className='w-5 h-5 text-emerald-600 mr-3' />
              <div>
                <div className='text-sm font-medium'>Email</div>
                <div className='text-sm text-gray-600'>{school.email}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {school.events?.map((event: any, index: number) => (
                <div key={index} className='flex items-start'>
                  <div className='bg-emerald-100 rounded p-2 mr-3'>
                    <Calendar className='w-5 h-5 text-emerald-600' />
                  </div>
                  <div>
                    <div className='font-medium'>{event.title}</div>
                    <div className='text-sm text-gray-600'>{event.date}</div>
                    <div className='text-sm text-gray-500 mt-1'>
                      {event.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
