/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrentUser } from "@/hooks/user";
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
  MessageSquare,
  UserPlus,
} from "lucide-react";

export const MobileMenu = ({ role = "admin" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useCurrentUser();
  const [items, setMenuItems] = useState<any[]>([]);

  useEffect(() => {
    // if (!user) return;
       // const schoolSlug = user?.school_slug;
    const schoolSlug = "SCH234"

    const allMenuItems: any = {
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
          icon: ClipboardList,
          label: "Exams",
          href: "/dashboard/school-123/admin/exams",
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
        {
          icon: Settings,
          label: "Settings",
          href: "/dashboard/admin/settings",
        },
      ],
      principal: [
        {
          icon: Home,
          label: "Overview",
          href: `/dashboard/${schoolSlug}/principal/`,
        },
        {
          icon: Users,
          label: "Faculty",
          href: `/dashboard/${schoolSlug}/principal/faculty`,
        },
        {
          icon: GraduationCap,
          label: "Students",
          href: `/dashboard/${schoolSlug}/principal/students`,
        },
        {
          icon: BookOpen,
          label: "Classes",
          href: `/dashboard/${schoolSlug}/principal/classes`,
        },
        {
          icon: BarChart2,
          label: "Performance Reports",
          href: `/dashboard/${schoolSlug}/principal/reports`,
        },
        {
          icon: UserPlus,
          label: "Admissions",
          href: `/dashboard/${schoolSlug}/principal/admission`,
        },
        {
          icon: Bell,
          label: "Notifications",
          href: `/dashboard/${schoolSlug}/principal/notifications`,
        },
        {
          icon: MessageSquare,
          label: "Feedback",
          href: `/dashboard/${schoolSlug}/principal/feedback`,
        },
      ],
      teacher: [
        { icon: Home, label: "Dashboard", href: "/dashboard/teacher" },
        {
          icon: BookOpen,
          label: "Classes",
          href: "/dashboard/teacher/classes",
        },
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
        {
          icon: BookOpen,
          label: "My Classes",
          href: "/dashboard/student/classes",
        },
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

    const items = allMenuItems[role] || [];
    setMenuItems(items);
  }, [user]);
  return (
    <div className='lg:hidden'>
      {/* Mobile Header */}
      <header className='fixed top-0 left-0 right-0 bg-white shadow-sm z-50'>
        <div className='flex items-center justify-between px-4 py-3'>
          <div className='flex items-center gap-3'>
            <button onClick={() => setIsOpen(true)}>
              <Menu className='w-6 h-6' />
            </button>
            <h1 className='font-bold text-gray-800'>Edtheta School</h1>
          </div>
          <button className='relative'>
            <Bell className='w-6 h-6' />
            <span className='absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full'></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 bg-black bg-opacity-50 z-50'
              onClick={() => setIsOpen(false)}
            />
            {/* Slide-in Menu */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween" }}
              className='fixed top-0 left-0 bottom-0 w-64 bg-white z-50'>
              <div className='flex items-center justify-between p-4 border-b'>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 bg-emerald-100 rounded-full' />
                  <h2 className='font-bold text-gray-800 capitalize'>
                    {role} Panel
                  </h2>
                </div>
                <button onClick={() => setIsOpen(false)}>
                  <X className='w-6 h-6' />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className='p-4'>
                {items.map((item: any) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                      pathname === item.href
                        ? "bg-emerald-50 text-emerald-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}>
                    <item.icon className='w-5 h-5' />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
