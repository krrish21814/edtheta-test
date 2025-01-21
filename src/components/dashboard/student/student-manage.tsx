"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Mail,
  Phone,
  Calendar,
  MapPin,
  UserCircle,
  Edit,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  class: string;
  division: string;
  rollNumber: string;
  attendance: {
    present: number;
    total: number;
  };
  grades: {
    subject: string;
    grade: string;
    percentage: number;
  }[];
  reports: {
    date: string;
    title: string;
    description: string;
  }[];
}

const dummyStudents: Student[] = Array.from({ length: 50 }, (_, index) => ({
  id: `${index + 1}`,
  name: `Student ${index + 1}`,
  email: `student${index + 1}@example.com`,
  phone: "123-456-7890",
  dateOfBirth: "2005-05-15",
  address: "123 School St, City, State",
  class: `Class ${String.fromCharCode(65 + (index % 3))}`, // Class A, B, C
  division: `Division ${1 + (index % 4)}`, // Division 1, 2, 3, 4
  rollNumber: `A${(index + 1).toString().padStart(3, "0")}`,
  attendance: {
    present: 85,
    total: 100,
  },
  grades: [
    { subject: "Mathematics", grade: "A", percentage: 92 },
    { subject: "Science", grade: "B+", percentage: 88 },
    { subject: "English", grade: "A-", percentage: 90 },
  ],
  reports: [
    {
      date: "2024-01-10",
      title: "Term 1 Report",
      description:
        "Excellent performance in mathematics. Shows good leadership qualities.",
    },
  ],
}));

const ITEMS_PER_PAGE = 10;

const StudentManagement = () => {
  const [students, setStudents] = useState<Student[]>(dummyStudents);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedStudent, setEditedStudent] = useState<Student | null>(null);

  // Get unique classes and divisions for filters
  const classes = Array.from(new Set(students.map((s) => s.class)));
  const divisions = Array.from(new Set(students.map((s) => s.division)));

  // Filter students based on search and filters
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClass =
      selectedClass && selectedClass === "all"
        ? true
        : selectedClass
        ? student.class === selectedClass
        : true;
    const matchesDivision =
      selectedDivision && selectedDivision === "all"
        ? true
        : selectedDivision
        ? student.division === selectedDivision
        : true;

    return matchesSearch && matchesClass && matchesDivision;
  });

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedStudents = filteredStudents.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
    setEditedStudent(student);
    setShowProfileDialog(true);
    setEditMode(false);
  };

  const handleUpdateStudent = () => {
    if (!editedStudent) return;

    setStudents(
      students.map((student) =>
        student.id === editedStudent.id ? editedStudent : student
      )
    );
    setSelectedStudent(editedStudent);
    setEditMode(false);
  };

  const calculateAttendancePercentage = (present: number, total: number) => {
    return ((present / total) * 100).toFixed(1);
  };

  // Mobile card view for student data
  const StudentCard = ({ student }: { student: Student }) => (
    <Card
      className='mb-4 cursor-pointer hover:bg-gray-50'
      onClick={() => handleStudentClick(student)}>
      <CardContent className='pt-4'>
        <div className='space-y-2'>
          <div className='flex justify-between items-center'>
            <div className='font-medium'>{student.name}</div>
            <div className='text-sm text-gray-500'>{student.rollNumber}</div>
          </div>
          <div className='text-sm text-gray-500'>
            {student.class} - {student.division}
          </div>
          <div className='text-sm'>{student.email}</div>
          <div className='flex justify-between items-center text-sm'>
            <span>Attendance:</span>
            <span className='font-medium'>
              {calculateAttendancePercentage(
                student.attendance.present,
                student.attendance.total
              )}
              %
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className='p-2 md:p-4'>
      <Card>
        <CardHeader>
          <div className='flex flex-col gap-4 md:flex-row md:justify-between md:items-center'>
            <CardTitle>Students Management</CardTitle>
            <div className='flex flex-col gap-2 md:flex-row md:gap-4'>
              <div className='relative w-full md:w-64'>
                <Search className='absolute left-2 top-2.5 h-4 w-4 text-gray-500' />
                <Input
                  placeholder='Search students...'
                  className='pl-8'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {/* <Button
                variant='outline'
                className='w-full md:w-auto'
                onClick={() => setShowFilters(!showFilters)}>
                <Filter className='h-4 w-4 mr-2' />
                Filters
              </Button> */}
            </div>
          </div>
        </CardHeader>

        <div className='px-4 pb-4 flex flex-col md:flex-row gap-4'>
          <div className='w-full md:w-48'>
            <Label htmlFor='class-filter'>Class</Label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue placeholder='All Classes' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Classes</SelectItem>
                {classes.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='w-full md:w-48'>
            <Label htmlFor='division-filter'>Division</Label>
            <Select
              value={selectedDivision}
              onValueChange={setSelectedDivision}>
              <SelectTrigger>
                <SelectValue placeholder='All Divisions' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Divisions</SelectItem>
                {divisions.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <CardContent>
          {/* Desktop Table View */}
          <div className='hidden md:block'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Roll No</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Division</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Attendance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedStudents.map((student) => (
                  <TableRow
                    key={student.id}
                    className='cursor-pointer hover:bg-gray-50'
                    onClick={() => handleStudentClick(student)}>
                    <TableCell>{student.rollNumber}</TableCell>
                    <TableCell className='font-medium'>
                      {student.name}
                    </TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>{student.division}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>
                      {calculateAttendancePercentage(
                        student.attendance.present,
                        student.attendance.total
                      )}
                      %
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className='md:hidden'>
            {paginatedStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>

          {/* Responsive Pagination */}
          <div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between mt-4'>
            <div className='text-sm text-gray-500 text-center md:text-left'>
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + ITEMS_PER_PAGE, filteredStudents.length)}{" "}
              of {filteredStudents.length} students
            </div>
            <div className='flex justify-center gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}>
                <ChevronLeft className='h-4 w-4' />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size='sm'
                    onClick={() => setCurrentPage(page)}
                    className='hidden md:block'>
                    {page}
                  </Button>
                )
              )}
              <div className='md:hidden'>
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant='outline'
                size='sm'
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}>
                <ChevronRight className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student Profile Dialog - Made Responsive */}
      <Dialog
        open={showProfileDialog}
        onOpenChange={(open) => {
          setShowProfileDialog(open);
          if (!open) {
            setEditMode(false);
          }
        }}>
        <DialogContent className='w-full max-w-4xl mx-2'>
          <DialogHeader>
            <div className='flex flex-col gap-4 md:flex-row md:justify-between md:items-center'>
              <DialogTitle>Student Profile</DialogTitle>
              {!editMode && (
                <Button variant='outline' onClick={() => setEditMode(true)}>
                  <Edit className='h-4 w-4 mr-2' />
                  Edit Profile
                </Button>
              )}
            </div>
          </DialogHeader>

          {selectedStudent && (
            <Tabs defaultValue='details' className='w-full'>
              <TabsList className='w-full flex flex-wrap'>
                <TabsTrigger value='details' className='flex-1'>
                  Details
                </TabsTrigger>
                <TabsTrigger value='attendance' className='flex-1'>
                  Attendance
                </TabsTrigger>
                <TabsTrigger value='grades' className='flex-1'>
                  Grades
                </TabsTrigger>
                <TabsTrigger value='reports' className='flex-1'>
                  Reports
                </TabsTrigger>
              </TabsList>

              <TabsContent value='details'>
                <div className='grid gap-4'>
                  {editMode ? (
                    <>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                          <Label htmlFor='name'>Name</Label>
                          <Input
                            id='name'
                            value={editedStudent?.name}
                            onChange={(e) =>
                              setEditedStudent((prev) =>
                                prev ? { ...prev, name: e.target.value } : null
                              )
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor='email'>Email</Label>
                          <Input
                            id='email'
                            value={editedStudent?.email}
                            onChange={(e) =>
                              setEditedStudent((prev) =>
                                prev ? { ...prev, email: e.target.value } : null
                              )
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor='phone'>Phone</Label>
                          <Input
                            id='phone'
                            value={editedStudent?.phone}
                            onChange={(e) =>
                              setEditedStudent((prev) =>
                                prev ? { ...prev, phone: e.target.value } : null
                              )
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor='address'>Address</Label>
                          <Input
                            id='address'
                            value={editedStudent?.address}
                            onChange={(e) =>
                              setEditedStudent((prev) =>
                                prev
                                  ? { ...prev, address: e.target.value }
                                  : null
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className='flex justify-end gap-2'>
                        <Button
                          variant='outline'
                          onClick={() => setEditMode(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleUpdateStudent}>
                          Save Changes
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className='space-y-4'>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                          <div className='flex items-center gap-2'>
                            <UserCircle className='h-4 w-4' />
                            <span className='font-semibold'>Name:</span>
                            <span>{selectedStudent.name}</span>
                          </div>
                          <div className='flex items-center gap-2'>
                            <Mail className='h-4 w-4' />
                            <span className='font-semibold'>Email:</span>
                            <span className='break-all'>
                              {selectedStudent.email}
                            </span>
                          </div>
                          <div className='flex items-center gap-2'>
                            <Phone className='h-4 w-4' />
                            <span className='font-semibold'>Phone:</span>
                            <span>{selectedStudent.phone}</span>
                          </div>
                        </div>
                        <div className='space-y-2'>
                          <div className='flex items-center gap-2'>
                            <Calendar className='h-4 w-4' />
                            <span className='font-semibold'>
                              Date of Birth:
                            </span>
                            <span>{selectedStudent.dateOfBirth}</span>
                          </div>
                          <div className='flex items-center gap-2'>
                            <MapPin className='h-4 w-4' />
                            <span className='font-semibold'>Address:</span>
                            <span className='break-all'>
                              {selectedStudent.address}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value='attendance'>
                <Card>
                  <CardContent className='pt-4'>
                    <div className='space-y-4'>
                      <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                        <h3 className='font-semibold'>Attendance Overview</h3>
                        <div className='text-2xl font-bold'>
                          {calculateAttendancePercentage(
                            selectedStudent.attendance.present,
                            selectedStudent.attendance.total
                          )}
                          %
                        </div>
                      </div>
                      <div className='w-full bg-gray-200 rounded-full h-2.5'>
                        <div
                          className='bg-blue-600 h-2.5 rounded-full'
                          style={{
                            width: `${
                              (selectedStudent.attendance.present /
                                selectedStudent.attendance.total) *
                              100
                            }%`,
                          }}></div>
                      </div>
                      <div className='text-sm text-gray-500 text-center md:text-left'>
                        Present: {selectedStudent.attendance.present} / Total:{" "}
                        {selectedStudent.attendance.total} days
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='grades'>
                <div className='overflow-x-auto'>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Subject</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Percentage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedStudent.grades.map((grade, index) => (
                        <TableRow key={index}>
                          <TableCell>{grade.subject}</TableCell>
                          <TableCell>{grade.grade}</TableCell>
                          <TableCell>{grade.percentage}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value='reports'>
                <Card>
                  <CardContent className='pt-4'>
                    <div className='space-y-4'>
                      <h3 className='font-semibold'>Reports</h3>
                      {selectedStudent.reports &&
                      selectedStudent.reports.length > 0 ? (
                        <ul className='list-disc list-inside'>
                          {selectedStudent.reports.map((report, index) => (
                            <li key={index}>
                              <span className='font-semibold'>Date:</span>{" "}
                              {report.date}
                              <br />
                              <span className='font-semibold'>
                                Details:
                              </span>{" "}
                              {report.description}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className='text-gray-500'>No reports available.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default StudentManagement;
