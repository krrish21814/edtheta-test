/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  BookOpen,
  GraduationCap,
  Calendar,
  ClipboardList,
  Settings,
  FileText,
  BarChart2,
  Bell,
  MessageSquare,
  ChevronLeft,
  UserPlus,
} from "lucide-react";

// Menus categorized by roles
export const menuItems: any = {
  admin: [
    { icon: Home, label: "Overview", href: "/dashboard/school-123/admin" },
    {
      icon: Users,
      label: "Faculty",
      href: "/dashboard/school-123/admin/faculty",
    },
    {
      icon: BookOpen,
      label: "Classes",
      href: "/dashboard/school-123/admin/classes",
    },
    {
      icon: GraduationCap,
      label: "Students",
      href: "/dashboard/school-123/admin/students",
    },
    {
      icon: ClipboardList,
      label: "Exams",
      href: "/dashboard/school-123/admin/exams",
    },
    {
      icon: Calendar,
      label: "Timetable",
      href: "/dashboard/school-123/admin/timetable",
    },
    {
      icon: BarChart2,
      label: "Reports",
      href: "/dashboard/school-123/admin/reports",
    },
    {
      icon: FileText,
      label: "Course Materials",
      href: "/dashboard/admin/materials",
    },
    {
      icon: UserPlus,
      label: "Admissions",
      href: "/dashboard/admin/admission",
    },
    {
      icon: Bell,
      label: "Notifications",
      href: "/dashboard/admin/notifications",
    },
    { icon: Settings, label: "Settings", href: "/dashboard/admin/settings" },
  ],
  principal: [
    { icon: Home, label: "Dashboard", href: "/dashboard/principal" },
    { icon: Users, label: "Faculty", href: "/dashboard/principal/faculty" },
    {
      icon: GraduationCap,
      label: "Students",
      href: "/dashboard/principal/students",
    },
    {
      icon: Calendar,
      label: "Timetable",
      href: "/dashboard/principal/timetable",
    },
    {
      icon: BarChart2,
      label: "Performance Reports",
      href: "/dashboard/principal/reports",
    },
    {
      icon: UserPlus,
      label: "Admissions",
      href: "/dashboard/admin/admission",
    },
    {
      icon: Bell,
      label: "Notifications",
      href: "/dashboard/principal/notifications",
    },
    {
      icon: MessageSquare,
      label: "Feedback",
      href: "/dashboard/principal/feedback",
    },
  ],
  teacher: [
    { icon: Home, label: "Dashboard", href: "/dashboard/teacher" },
    { icon: BookOpen, label: "Classes", href: "/dashboard/teacher/classes" },
    {
      icon: ClipboardList,
      label: "Assignments",
      href: "/dashboard/teacher/assignments",
    },
    {
      icon: Calendar,
      label: "Timetable",
      href: "/dashboard/teacher/timetable",
    },
    {
      icon: FileText,
      label: "Course Materials",
      href: "/dashboard/teacher/materials",
    },
    {
      icon: Bell,
      label: "Notifications",
      href: "/dashboard/teacher/notifications",
    },
    {
      icon: MessageSquare,
      label: "Student Feedback",
      href: "/dashboard/teacher/feedback",
    },
  ],
  student: [
    { icon: Home, label: "Dashboard", href: "/dashboard/student" },
    { icon: BookOpen, label: "My Classes", href: "/dashboard/student/classes" },
    {
      icon: ClipboardList,
      label: "Assignments",
      href: "/dashboard/student/assignments",
    },
    {
      icon: FileText,
      label: "Study Materials",
      href: "/dashboard/student/materials",
    },
    {
      icon: Calendar,
      label: "Timetable",
      href: "/dashboard/student/timetable",
    },
    {
      icon: BarChart2,
      label: "Performance",
      href: "/dashboard/student/performance",
    },
    {
      icon: Bell,
      label: "Notifications",
      href: "/dashboard/student/notifications",
    },
  ],
};

export const AdminNav = ({ role = "admin" }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const items = menuItems[role] || [];

  return (
    <aside className='hidden lg:flex flex-col fixed top-0 left-0 h-full bg-white shadow-lg z-40'>
      <div
        className={`transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}>
        {/* School Profile */}
        <div className='p-6 border-b'>
          {!isCollapsed && (
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 bg-emerald-100 rounded-full'>
                {/* School Logo */}
              </div>
              <div>
                <h1 className='font-bold text-gray-800'>Edtheta School</h1>
                <p className='text-sm text-gray-500'>{role} Panel</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className='p-4'>
          {items.map((item: any) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                pathname === item.href
                  ? "bg-emerald-50 text-emerald-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}>
              <item.icon className='w-5 h-5' />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className='absolute -right-3 top-20 bg-white rounded-full p-1.5 shadow-md'>
          <ChevronLeft
            className={`w-4 h-4 transition-transform ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </aside>
  );
};
