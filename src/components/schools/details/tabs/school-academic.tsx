/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Award } from "lucide-react";

export function SchoolAcademics({ school }: { school: any }) {
  return (
    <div className='space-y-6'>
      {/* Academic Programs */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Programs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid md:grid-cols-2 gap-6'>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Curriculum</h3>
              <ul className='space-y-2'>
                <li className='flex items-center'>
                  <Book className='w-5 h-5 text-emerald-600 mr-2' />
                  <span>Primary Years Programme (PYP)</span>
                </li>
                <li className='flex items-center'>
                  <Book className='w-5 h-5 text-emerald-600 mr-2' />
                  <span>Middle Years Programme (MYP)</span>
                </li>
                <li className='flex items-center'>
                  <Book className='w-5 h-5 text-emerald-600 mr-2' />
                  <span>Diploma Programme (DP)</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Specializations</h3>
              <ul className='space-y-2'>
                <li className='flex items-center'>
                  <Award className='w-5 h-5 text-emerald-600 mr-2' />
                  <span>STEM Education</span>
                </li>
                <li className='flex items-center'>
                  <Award className='w-5 h-5 text-emerald-600 mr-2' />
                  <span>Languages</span>
                </li>
                <li className='flex items-center'>
                  <Award className='w-5 h-5 text-emerald-600 mr-2' />
                  <span>Arts & Music</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Faculty */}
      <Card>
        <CardHeader>
          <CardTitle>Our Faculty</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {school.teachers.map((teacher: any, index: number) => (
              <Card key={index} className='overflow-hidden'>
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className='w-full h-48 object-cover'
                />
                <CardContent className='p-4'>
                  <h4 className='font-semibold'>{teacher.name}</h4>
                  <p className='text-sm text-gray-600'>{teacher.subject}</p>
                  <p className='text-sm text-gray-500'>
                    Experience: {teacher.experience}
                  </p>
                  <div className='mt-2'>
                    <h5 className='text-sm font-medium'>Achievements:</h5>
                    <ul className='text-sm text-gray-600'>
                      {teacher.achievements.map(
                        (achievement: string, idx: number) => (
                          <li key={idx}>{achievement}</li>
                        )
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Facilities */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Facilities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid md:grid-cols-3 gap-4'>
            {school.facilities.map((facility: string, index: number) => (
              <div key={index} className='bg-emerald-50 p-4 rounded-lg'>
                <span className='text-emerald-600 font-medium'>{facility}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
