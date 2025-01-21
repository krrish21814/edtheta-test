"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  GraduationCap,
  BookOpen,
  Clock,
  Percent,
  Award,
} from "lucide-react";
import { SchoolStats } from "@/types/stats";

interface StatsOverviewProps {
  stats: SchoolStats;
}

export const StatsOverview = ({ stats }: StatsOverviewProps) => {
  const quickStats = [
    {
      label: "Total Students",
      value: stats.overview.totalStudents,
      icon: Users,
      color: "emerald",
    },
    {
      label: "Total Teachers",
      value: stats.overview.totalTeachers,
      icon: GraduationCap,
      color: "blue",
    },
    {
      label: "Active Subjects",
      value: stats.overview.activeSubjects,
      icon: BookOpen,
      color: "indigo",
    },
    {
      label: "Weekly Classes",
      value: stats.overview.weeklyClasses,
      icon: Clock,
      color: "violet",
    },
    {
      label: "Avg Attendance",
      value: `${stats.overview.averageAttendance}%`,
      icon: Percent,
      color: "purple",
    },
    {
      label: "Avg Performance",
      value: `${stats.overview.averagePerformance}%`,
      icon: Award,
      color: "pink",
    },
  ];

  return (
    <div className='space-y-6'>
      {/* Quick Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4'>
        {quickStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className='bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-500 text-sm'>{stat.label}</p>
                <p className='text-2xl font-semibold text-gray-800 mt-1'>
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 bg-emerald-100 rounded-full`}>
                <stat.icon className={`w-6 h-6 text-emerald-600`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Attendance Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-white p-6 rounded-xl shadow-sm'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>
            Attendance Trends
          </h3>
          <div className='w-full h-[250px] md:h-[350px]'>
            <ResponsiveContainer>
              <LineChart data={stats.attendanceByMonth}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='month' />
                <YAxis />
                <Tooltip />
                <Line
                  type='monotone'
                  dataKey='attendance'
                  stroke='#059669'
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Performance Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-white p-6 rounded-xl shadow-sm'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>
            Performance Distribution
          </h3>
          <div className='w-full h-[250px] md:h-[350px]'>
            <ResponsiveContainer>
              <BarChart
                data={[
                  {
                    range: "90-100%",
                    students: stats.performanceStats.above90,
                  },
                  { range: "80-90%", students: stats.performanceStats.above80 },
                  { range: "70-80%", students: stats.performanceStats.above70 },
                  { range: "60-70%", students: stats.performanceStats.above60 },
                  {
                    range: "Below 60%",
                    students: stats.performanceStats.below60,
                  },
                ]}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='range' />
                <YAxis />
                <Tooltip />
                <Bar dataKey='students' fill='#059669' />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Subject Performance Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='bg-white p-6 rounded-xl shadow-sm'>
        <h3 className='text-lg font-semibold text-gray-800 mb-4'>
          Class Performance
        </h3>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='bg-gray-50'>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Class
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Students
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Average Performace
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Average Attendance
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {stats.classwise.map((classDiv) => (
                <tr key={classDiv.classId}>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-medium text-gray-900'>
                      {classDiv.className}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-500'>
                      {classDiv.totalStudents}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-500'>
                      {classDiv.averagePerformance}%
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-500'>
                      {classDiv.averageAttendance}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};
