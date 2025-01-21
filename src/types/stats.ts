export interface SchoolStats {
  overview: {
    totalStudents: number;
    totalTeachers: number;
    totalClasses: number;
    activeSubjects: number;
    weeklyClasses: number;
    averageAttendance: number;
    averagePerformance: number;
  };
  classwise: {
    classId: string;
    className: string;
    totalStudents: number;
    divisions: number;
    averageAttendance: number;
    averagePerformance: number;
  }[];
  performanceStats: {
    above90: number;
    above80: number;
    above70: number;
    above60: number;
    below60: number;
  };
  attendanceByMonth: {
    month: string;
    attendance: number;
  }[];
  subjectwise: {
    subjectName: string;
    studentsEnrolled: number;
    averageScore: number;
    teacherCount: number;
  }[];
}
