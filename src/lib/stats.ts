import { SchoolStats } from "@/types/stats";
import {
  Users,
  Book,
  Award,
  FileText,
  Calendar,
  CheckSquare,
} from "lucide-react";

export const getStatsConfig = (userRole: string) => {
  const stats = {
    admin: [
      { label: "Total Students", value: "2,453", icon: Users },
      { label: "Active Courses", value: "186", icon: Book },
      { label: "Success Rate", value: "92%", icon: Award },
    ],
    teacher: [
      { label: "Active Students", value: "156", icon: Users },
      { label: "Courses", value: "8", icon: Book },
      { label: "Assignments", value: "24", icon: FileText },
      { label: "Average Score", value: "85%", icon: Award },
    ],
    student: [
      { label: "Enrolled Courses", value: "6", icon: Book },
      { label: "Completed", value: "4", icon: CheckSquare },
      { label: "Due Tasks", value: "8", icon: Calendar },
      { label: "Average Grade", value: "A-", icon: Award },
    ],
  };

  return stats[userRole] || [];
};

export async function getSchoolStats(): Promise<SchoolStats> {
  // In a real application, this would fetch from your database
  return {
    overview: {
      totalStudents: 1250,
      totalTeachers: 45,
      totalClasses: 10,
      activeSubjects: 8,
      weeklyClasses: 240,
      averageAttendance: 92,
      averagePerformance: 78.5,
    },
    classwise: [
      {
        classId: "1",
        className: "Standard 1",
        totalStudents: 120,
        divisions: 3,
        averageAttendance: 94,
        averagePerformance: 82,
      },
      {
        classId: "2",
        className: "Standard 2",
        totalStudents: 125,
        divisions: 3,
        averageAttendance: 91,
        averagePerformance: 79,
      },
      {
        classId: "3",
        className: "Standard 3",
        totalStudents: 118,
        divisions: 3,
        averageAttendance: 93,
        averagePerformance: 77,
      },
    ],
    performanceStats: {
      above90: 15,
      above80: 30,
      above70: 25,
      above60: 20,
      below60: 10,
    },
    attendanceByMonth: [
      { month: "Jan", attendance: 94 },
      { month: "Feb", attendance: 92 },
      { month: "Mar", attendance: 93 },
      { month: "Apr", attendance: 91 },
      { month: "May", attendance: 90 },
      { month: "Jun", attendance: 89 },
    ],
    subjectwise: [
      {
        subjectName: "Mathematics",
        studentsEnrolled: 1250,
        averageScore: 76.5,
        teacherCount: 6,
      },
      {
        subjectName: "Science",
        studentsEnrolled: 1250,
        averageScore: 79.2,
        teacherCount: 8,
      },
      {
        subjectName: "English",
        studentsEnrolled: 1250,
        averageScore: 82.1,
        teacherCount: 5,
      },
      {
        subjectName: "Social Studies",
        studentsEnrolled: 1250,
        averageScore: 77.8,
        teacherCount: 4,
      },
    ],
  };
}
