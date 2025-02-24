/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
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
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import { IUser } from "@/models/user";


// Menus categorized by roles

export const AdminNav = ({ role = "admin" }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  // const { user } = useCurrentUser();

  const user: IUser = {
    email: "john.doe@example.com",
    password: "SecurePass123!",
    name: "John Doe",
    isBlocked: false,
    isVerified: true,
    isApproved: true,
    role: "student",
    slug: "john-doe",
    phone: "+911234567890",
    isMobileVerified: true,
    dateOfBirth: new Date("1990-05-15"),
    geoCode: {
      lat: 28.6139,
      lng: 77.2090
    },
    comparePassword: async (candidatePassword: string): Promise<boolean> => {
      return candidatePassword === "SecurePass123!";
    }
  };
  
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
          href: `/dashboard/${schoolSlug}/principal`,
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
          label: "Reports",
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
    <aside className='hidden lg:flex flex-col fixed top-0 left-0 h-full bg-white shadow-lg z-40'>
      <div
        className={`transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}>
        {/* School Profile */}
        <div className='p-6 border-b'>
          {!isCollapsed && (
            <div className='flex items-center gap-3'>
              <div className=' rounded-full'>
                <div className='relative'>
                  <button
                    id='profile-button'
                    className='flex items-center gap-2 w-12 h-12 rounded-full hover:bg-gray-50  transition-colors'>
                    {user?.profilePhoto ? (
                      <Image
                        src={user?.profilePhoto}
                        alt={`${user?.name}'s profile`}
                        width={80}
                        height={80}
                        className='rounded-full'
                      />
                    ) : (
                      <div className='w-8 h-8 bg-emerald-600 text-white flex items-center justify-center rounded-full'>
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                  </button>
                </div>
              </div>
              <div>
                <h1 className='font-bold text-gray-800'>{user?.name}</h1>
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
