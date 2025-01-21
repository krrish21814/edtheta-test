/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, DollarSign } from "lucide-react";

export function SchoolAdmissions({ school }: { school: any }) {
  return (
    <div className='space-y-6'>
      {/* Admission Process */}
      <Card>
        <CardHeader>
          <CardTitle>Admission Process</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid md:grid-cols-2 gap-6'>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Steps</h3>
              <div className='space-y-4'>
                {school.admissions.process.map(
                  (step: string, index: number) => (
                    <div key={index} className='flex items-center'>
                      <div className='bg-emerald-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0'>
                        <span className='text-emerald-700 font-medium'>
                          {index + 1}
                        </span>
                      </div>
                      <div className='text-gray-600'>{step}</div>
                    </div>
                  )
                )}
              </div>
            </div>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Requirements</h3>
              <div className='space-y-3'>
                {school.admissions.requirements.map(
                  (req: string, index: number) => (
                    <div key={index} className='flex items-center'>
                      <CheckCircle className='w-5 h-5 text-emerald-600 mr-2' />
                      <span className='text-gray-600'>{req}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fee Structure */}
      <Card>
        <CardHeader>
          <CardTitle>Fee Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {Object.entries(school.admissions.fees).map(
              ([key, value]: [string, any]) => (
                <div key={key} className='bg-emerald-50 p-4 rounded-lg'>
                  <div className='flex items-center mb-2'>
                    <DollarSign className='w-5 h-5 text-emerald-600 mr-2' />
                    <h4 className='font-medium capitalize'>
                      {key.replace("_", " ")}
                    </h4>
                  </div>
                  <p className='text-2xl font-bold text-emerald-700'>{value}</p>
                </div>
              )
            )}
          </div>
          <div className='mt-6'>
            <h4 className='font-medium mb-2'>Next Intake Date</h4>
            <p className='text-emerald-600 font-semibold'>
              {school.admissions.nextIntakeDate}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
