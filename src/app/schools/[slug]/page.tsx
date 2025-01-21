// app/schools/[slug]/page.tsx

import { ReviewsSection } from "@/components/schools/details/reviews-section";
import { SchoolBreadcrumb } from "@/components/schools/details/school-breadcrumb";
import { SchoolContent } from "@/components/schools/details/school-content";
import { SchoolHero } from "@/components/schools/details/school-hero";

// This would typically come from your database
const getSchoolData = (slug: string) => {
  // Dummy data
  return {
    id: "1",
    slug: "greenfield-international-school",
    name: "Greenfield International School",
    address: "1234 Elm Street, Springfield",
    rating: 4.5,
    image: "/school.jpg",
    timing: "8:00 AM - 3:00 PM",
    board: "CBSE",
    phone: "+1 234 567 890",
    email: "info@greenfield.edu",
    website: "www.greenfield.edu",
    description:
      "Greenfield International School has been a cornerstone of educational excellence since 1995. Our institution combines traditional values with modern teaching methodologies to create well-rounded individuals prepared for the challenges of tomorrow.",
    founded: "1995",
    studentCount: 1200,
    teacherCount: 80,
    classSize: 15,
    facilities: [
      "Smart Classrooms",
      "Olympic-size Swimming Pool",
      "Advanced Science Labs",
      "Digital Library",
      "Sports Complex",
      "Cafeteria",
      "Transportation",
      "Medical Center",
    ],
    accreditations: [
      "International Baccalaureate (IB)",
      "Cambridge Assessment International Education",
      "Council of International Schools (CIS)",
    ],
    events: [
      {
        date: "2025-01-15",
        title: "Annual Science Fair",
        description: "Showcasing innovative projects from grades 6-12",
      },
      {
        date: "2025-01-20",
        title: "Parent-Teacher Conference",
        description: "Mid-year academic progress review",
      },
      {
        date: "2025-02-05",
        title: "Sports Day",
        description: "Annual athletic competition and family day",
      },
    ],
    announcements: [
      {
        date: "2025-01-10",
        title: "New STEM Program Launch",
        content:
          "Exciting new robotics and coding curriculum starting next semester",
      },
      {
        date: "2025-01-08",
        title: "Academic Excellence Awards",
        content:
          "Congratulations to our students who achieved perfect scores in IB exams",
      },
    ],
    gallery: [
      {
        type: "image",
        url: "/gallery/campus-1.jpg",
        caption: "Main Campus Building",
      },
      {
        type: "image",
        url: "/gallery/library.jpg",
        caption: "Digital Library",
      },
      {
        type: "image",
        url: "/gallery/lab.jpg",
        caption: "Advanced Science Lab",
      },
    ],
    teachers: [
      {
        name: "Dr. Sarah Johnson",
        subject: "Physics",
        experience: "15 years",
        image: "/teachers/sarah.jpg",
        qualifications: "Ph.D. in Physics",
        achievements: [
          "Best Teacher Award 2023",
          "Published Research Paper in Science Education",
        ],
      },
      {
        name: "Prof. Michael Chen",
        subject: "Mathematics",
        experience: "12 years",
        image: "/teachers/michael.jpg",
        qualifications: "M.Sc. in Mathematics",
        achievements: [
          "Mathematics Olympiad Coach",
          "Curriculum Development Lead",
        ],
      },
    ],
    performanceData: [
      { year: "2020", academics: 85, sports: 70, activities: 75 },
      { year: "2021", academics: 88, sports: 75, activities: 80 },
      { year: "2022", academics: 90, sports: 85, activities: 85 },
      { year: "2023", academics: 92, sports: 88, activities: 90 },
    ],
    admissions: {
      process: [
        "Online Application Submission",
        "Entrance Test",
        "Student Interview",
        "Parent Interview",
        "Document Verification",
      ],
      requirements: [
        "Age appropriate for grade level",
        "Previous academic records",
        "Transfer certificate from previous school",
        "Medical records",
      ],
      fees: {
        application: "$100",
        admission: "$500",
        tuition: "$12,000/year",
        transportation: "$1,200/year",
      },
      nextIntakeDate: "2025-08-15",
    },
  };
};

interface PageProps {
  params: {
    slug: string;
  };
}
const mockReviews = [
  {
    name: "John Doe",
    rating: 5,
    date: "2025-01-01",
    comment:
      "An excellent school with top-notch facilities and great teachers!",
  },
  {
    name: "Jane Smith",
    rating: 4,
    date: "2025-01-03",
    comment: "Good overall experience. The staff is supportive.",
  },
];

export default async function SchoolDetailPage({ params }: PageProps) {
  const school = getSchoolData(params.slug);

  return (
    <div className='min-h-screen bg-gray-50'>
      <SchoolBreadcrumb name={school.name} />
      <SchoolHero school={school} />
      <SchoolContent school={school} />
      <ReviewsSection reviews={mockReviews} />
    </div>
  );
}
