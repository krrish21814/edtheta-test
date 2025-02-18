export interface School {
  id: string;
  slug: string;
  name: string;
  schoolCode: string;
  address: string;
  ratings: number;
  photo?: string;
  distanceAway?: string;
  timing: {
    start: string;
    end: string;
  };
  board: string;
  phone: string;
  email: string;
  website?: string;
  description: string;
  founded: string;
  studentCount: number;
  teacherCount: number;
  classSize: number;
  amenities: string[];
  accreditations: string[];
  events: Event[];
  announcements: Announcement[];
  gallery: GalleryItem[];
  teachers: Teacher[];
  performanceData: PerformanceData[];
  admissions: AdmissionInfo;
}

interface Event {
  date: string;
  title: string;
  description: string;
}

interface Announcement {
  date: string;
  title: string;
  content: string;
}

interface GalleryItem {
  type: string;
  url: string;
  caption: string;
}

interface Teacher {
  name: string;
  subject: string;
  experience: string;
  image: string;
  qualifications: string;
  achievements: string[];
}

interface PerformanceData {
  year: string;
  academics: number;
  sports: number;
  activities: number;
}

interface AdmissionInfo {
  process: string[];
  requirements: string[];
  fees: {
    application: string;
    admission: string;
    tuition: string;
    transportation: string;
  };
  nextIntakeDate: string;
}

export interface Class {
  id: string;
  name: string; // e.g., "Standard 1"
  divisions: Division[];
}

export interface Division {
  id: string;
  name: string; // e.g., "A", "B"
  classId: string;
  students: number;
}

export interface Subject {
  id: string;
  name: string;
  classId: string;
  teacherId: string;
  courses: Course[];
}

export interface Course {
  id: string;
  name: string;
  subjectId: string;
  semester: 1 | 2 | 3 | 4;
  description: string;
}

export interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  subjectId: string;
  teacherId: string;
  divisionId: string;
}

