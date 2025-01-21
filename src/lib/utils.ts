import { Class } from "@/types/classes";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};

export const dummyData: Class[] = [
  {
    id: "class1",
    name: "Class A",
    divisions: [
      {
        id: "division1",
        name: "Division 1",
        subjects: [
          {
            id: "subject1",
            name: "Mathematics",
            courses: [
              {
                id: "course1",
                name: "Algebra 101",
                description: "Introduction to basic algebra concepts.",
                credits: 3,
              },
              {
                id: "course2",
                name: "Geometry Basics",
                description:
                  "Fundamentals of geometry including shapes and theorems.",
                credits: 2,
              },
            ],
          },
          {
            id: "subject2",
            name: "Science",
            courses: [
              {
                id: "course3",
                name: "Physics 101",
                description:
                  "Basic concepts in physics such as motion and force.",
                credits: 4,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "class2",
    name: "Class B",
    divisions: [
      {
        id: "division2",
        name: "Division 2",
        subjects: [
          {
            id: "subject3",
            name: "History",
            courses: [
              {
                id: "course4",
                name: "World War II",
                description:
                  "An overview of the events and impact of World War II.",
                credits: 3,
              },
            ],
          },
        ],
      },
    ],
  },
];
