import {
  BookOpen,
  Users,
  Calendar,
  MessageSquare,
  BarChart2,
  Settings,
  Brain,
  FileText,
  CheckSquare,
  Award,
} from "lucide-react";

export const getNavItems = (pathname: string) => {
  const userRole = pathname.split("/")[2]; // Extracts role from URL

  const commonItems = [
    { icon: BookOpen, label: "Courses", href: `/${userRole}/courses` },
    { icon: Calendar, label: "Schedule", href: `/${userRole}/schedule` },
    { icon: MessageSquare, label: "Messages", href: `/${userRole}/messages` },
    { icon: Settings, label: "Settings", href: `/${userRole}/settings` },
  ];

  switch (userRole) {
    case "admin":
      return [
        ...commonItems,
        { icon: Users, label: "Users", href: "/admin/users" },
        { icon: BarChart2, label: "Analytics", href: "/admin/analytics" },
      ];
    case "teacher":
      return [
        ...commonItems,
        { icon: Brain, label: "AI Assessment", href: "/teacher/ai-assessment" },
        { icon: FileText, label: "Assignments", href: "/teacher/assignments" },
      ];
    case "student":
      return [
        ...commonItems,
        { icon: CheckSquare, label: "Tasks", href: "/student/tasks" },
        { icon: Award, label: "Progress", href: "/student/progress" },
      ];
    default:
      return commonItems;
  }
};
