"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/button";

interface Course {
  id: string;
  name: string;
  description: string;
  credits: number;
}

interface Subject {
  id: string;
  name: string;
  courses: Course[];
}

interface Division {
  id: string;
  name: string;
  subjects: Subject[];
}

interface Class {
  id: string;
  name: string;
  divisions: Division[];
}
const dummyData: Class[] = [
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
      {
        id: "division3",
        name: "Division 3",
        subjects: [
          {
            id: "subject4",
            name: "English",
            courses: [
              {
                id: "course5",
                name: "Shakespearean Literature",
                description: "Study of major works by William Shakespeare.",
                credits: 3,
              },
            ],
          },
        ],
      },
    ],
  },
];

interface ClassesManagementProps {
  initialClasses: Class[];
}
const ClassesManagement = ({
  initialClasses = dummyData,
}: ClassesManagementProps) => {
  const [classes, setClasses] = useState<Class[]>(initialClasses);
  const [expandedClass, setExpandedClass] = useState<string | null>(null);
  const [expandedDivision, setExpandedDivision] = useState<string | null>(null);
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  // Dialog states
  const [showClassDialog, setShowClassDialog] = useState(false);
  const [showDivisionDialog, setShowDivisionDialog] = useState(false);
  const [showSubjectDialog, setShowSubjectDialog] = useState(false);
  const [showCourseDialog, setShowCourseDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Form states
  const [newClass, setNewClass] = useState({ name: "" });
  const [newDivision, setNewDivision] = useState({ name: "", classId: "" });
  const [newSubject, setNewSubject] = useState({ name: "", divisionId: "" });
  const [newCourse, setNewCourse] = useState({
    name: "",
    description: "",
    credits: 0,
    subjectId: "",
  });

  // Delete state
  const [itemToDelete, setItemToDelete] = useState<{
    type: "class" | "division" | "subject" | "course";
    id: string;
    parentId?: string;
  } | null>(null);

  // CRUD operations for Class
  const addClass = () => {
    const newClassItem: Class = {
      id: Math.random().toString(36).substr(2, 9),
      name: newClass.name,
      divisions: [],
    };
    setClasses([...classes, newClassItem]);
    setShowClassDialog(false);
    setNewClass({ name: "" });
  };

  const deleteClass = (classId: string) => {
    setClasses(classes.filter((c) => c.id !== classId));
    setShowDeleteDialog(false);
    setItemToDelete(null);
  };

  // CRUD operations for Division
  const addDivision = () => {
    const updatedClasses = classes.map((c) => {
      if (c.id === newDivision.classId) {
        return {
          ...c,
          divisions: [
            ...c.divisions,
            {
              id: Math.random().toString(36).substr(2, 9),
              name: newDivision.name,
              subjects: [],
            },
          ],
        };
      }
      return c;
    });
    setClasses(updatedClasses);
    setShowDivisionDialog(false);
    setNewDivision({ name: "", classId: "" });
  };

  const deleteDivision = (classId: string, divisionId: string) => {
    const updatedClasses = classes.map((c) => {
      if (c.id === classId) {
        return {
          ...c,
          divisions: c.divisions.filter((d) => d.id !== divisionId),
        };
      }
      return c;
    });
    setClasses(updatedClasses);
    setShowDeleteDialog(false);
    setItemToDelete(null);
  };

  // CRUD operations for Subject
  const addSubject = () => {
    const updatedClasses = classes.map((c) => {
      const updatedDivisions = c.divisions.map((d) => {
        if (d.id === newSubject.divisionId) {
          return {
            ...d,
            subjects: [
              ...d.subjects,
              {
                id: Math.random().toString(36).substr(2, 9),
                name: newSubject.name,
                courses: [],
              },
            ],
          };
        }
        return d;
      });
      return { ...c, divisions: updatedDivisions };
    });
    setClasses(updatedClasses);
    setShowSubjectDialog(false);
    setNewSubject({ name: "", divisionId: "" });
  };

  const deleteSubject = (divisionId: string, subjectId: string) => {
    const updatedClasses = classes.map((c) => ({
      ...c,
      divisions: c.divisions.map((d) => {
        if (d.id === divisionId) {
          return {
            ...d,
            subjects: d.subjects.filter((s) => s.id !== subjectId),
          };
        }
        return d;
      }),
    }));
    setClasses(updatedClasses);
    setShowDeleteDialog(false);
    setItemToDelete(null);
  };

  // CRUD operations for Course
  const addCourse = () => {
    const updatedClasses = classes.map((c) => ({
      ...c,
      divisions: c.divisions.map((d) => ({
        ...d,
        subjects: d.subjects.map((s) => {
          if (s.id === newCourse.subjectId) {
            return {
              ...s,
              courses: [
                ...s.courses,
                {
                  id: Math.random().toString(36).substr(2, 9),
                  name: newCourse.name,
                  description: newCourse.description,
                  credits: newCourse.credits,
                },
              ],
            };
          }
          return s;
        }),
      })),
    }));
    setClasses(updatedClasses);
    setShowCourseDialog(false);
    setNewCourse({ name: "", description: "", credits: 0, subjectId: "" });
  };

  const deleteCourse = (subjectId: string, courseId: string) => {
    const updatedClasses = classes.map((c) => ({
      ...c,
      divisions: c.divisions.map((d) => ({
        ...d,
        subjects: d.subjects.map((s) => {
          if (s.id === subjectId) {
            return {
              ...s,
              courses: s.courses.filter((course) => course.id !== courseId),
            };
          }
          return s;
        }),
      })),
    }));
    setClasses(updatedClasses);
    setShowDeleteDialog(false);
    setItemToDelete(null);
  };

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Classes Management</h1>
        <Button onClick={() => setShowClassDialog(true)}>
          <Plus className='mr-2 h-4 w-4' /> Add Class
        </Button>
      </div>

      {classes.map((classItem) => (
        <Card key={classItem.id} className='mb-4'>
          <CardHeader className='flex flex-row items-center justify-between'>
            <div
              className='flex items-center cursor-pointer'
              onClick={() =>
                setExpandedClass(
                  expandedClass === classItem.id ? null : classItem.id
                )
              }>
              {expandedClass === classItem.id ? (
                <ChevronDown className='mr-2' />
              ) : (
                <ChevronRight className='mr-2' />
              )}
              <CardTitle>{classItem.name}</CardTitle>
            </div>
            <div className='flex gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => {
                  setItemToDelete({ type: "class", id: classItem.id });
                  setShowDeleteDialog(true);
                }}>
                <Trash2 className='h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() => {
                  setNewDivision({ ...newDivision, classId: classItem.id });
                  setShowDivisionDialog(true);
                }}>
                <Plus className='h-4 w-4' /> Add Division
              </Button>
            </div>
          </CardHeader>

          {expandedClass === classItem.id && (
            <CardContent>
              {classItem.divisions.map((division) => (
                <div key={division.id} className='ml-4 mb-4'>
                  <div className='flex items-center justify-between'>
                    <div
                      className='flex items-center cursor-pointer'
                      onClick={() =>
                        setExpandedDivision(
                          expandedDivision === division.id ? null : division.id
                        )
                      }>
                      {expandedDivision === division.id ? (
                        <ChevronDown className='mr-2' />
                      ) : (
                        <ChevronRight className='mr-2' />
                      )}
                      <h3 className='font-semibold'>{division.name}</h3>
                    </div>
                    <div className='flex gap-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => {
                          setItemToDelete({
                            type: "division",
                            id: division.id,
                            parentId: classItem.id,
                          });
                          setShowDeleteDialog(true);
                        }}>
                        <Trash2 className='h-4 w-4' />
                      </Button>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => {
                          setNewSubject({
                            ...newSubject,
                            divisionId: division.id,
                          });
                          setShowSubjectDialog(true);
                        }}>
                        <Plus className='h-4 w-4' /> Add Subject
                      </Button>
                    </div>
                  </div>

                  {expandedDivision === division.id && (
                    <div className='ml-4 mt-2'>
                      {division.subjects.map((subject) => (
                        <div key={subject.id} className='mb-2'>
                          <div className='flex items-center justify-between'>
                            <div
                              className='flex items-center cursor-pointer'
                              onClick={() =>
                                setExpandedSubject(
                                  expandedSubject === subject.id
                                    ? null
                                    : subject.id
                                )
                              }>
                              {expandedSubject === subject.id ? (
                                <ChevronDown className='mr-2' />
                              ) : (
                                <ChevronRight className='mr-2' />
                              )}
                              <h4 className='font-medium'>{subject.name}</h4>
                            </div>
                            <div className='flex gap-2'>
                              <Button
                                variant='outline'
                                size='sm'
                                onClick={() => {
                                  setItemToDelete({
                                    type: "subject",
                                    id: subject.id,
                                    parentId: division.id,
                                  });
                                  setShowDeleteDialog(true);
                                }}>
                                <Trash2 className='h-4 w-4' />
                              </Button>
                              <Button
                                variant='outline'
                                size='sm'
                                onClick={() => {
                                  setNewCourse({
                                    ...newCourse,
                                    subjectId: subject.id,
                                  });
                                  setShowCourseDialog(true);
                                }}>
                                <Plus className='h-4 w-4' /> Add Course
                              </Button>
                            </div>
                          </div>

                          {expandedSubject === subject.id && (
                            <div className='ml-4 mt-2'>
                              {subject.courses.map((course) => (
                                <div
                                  key={course.id}
                                  className='flex items-center justify-between p-2 bg-gray-50 rounded-md mb-2'>
                                  <div>
                                    <h5 className='font-medium'>
                                      {course.name}
                                    </h5>
                                    <p className='text-sm text-gray-600'>
                                      {course.description}
                                    </p>
                                    <p className='text-sm text-gray-600'>
                                      Credits: {course.credits}
                                    </p>
                                  </div>
                                  <Button
                                    variant='outline'
                                    size='sm'
                                    onClick={() => {
                                      setItemToDelete({
                                        type: "course",
                                        id: course.id,
                                        parentId: subject.id,
                                      });
                                      setShowDeleteDialog(true);
                                    }}>
                                    <Trash2 className='h-4 w-4' />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          )}
        </Card>
      ))}

      {/* Class Dialog */}
      <Dialog open={showClassDialog} onOpenChange={setShowClassDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Class</DialogTitle>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='className'>Class Name</Label>
              <Input
                id='className'
                value={newClass.name}
                onChange={(e) => setNewClass({ name: e.target.value })}
              />
            </div>
          </div>
          <div className='flex justify-end gap-2'>
            <Button variant='outline' onClick={() => setShowClassDialog(false)}>
              Cancel
            </Button>
            <Button onClick={addClass}>Add Class</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Division Dialog */}
      <Dialog open={showDivisionDialog} onOpenChange={setShowDivisionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Division</DialogTitle>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='divisionName'>Division Name</Label>
              <Input
                id='divisionName'
                value={newDivision.name}
                onChange={(e) =>
                  setNewDivision({ ...newDivision, name: e.target.value })
                }
              />
            </div>
          </div>
          <div className='flex justify-end gap-2'>
            <Button
              variant='outline'
              onClick={() => setShowDivisionDialog(false)}>
              Cancel
            </Button>
            <Button onClick={addDivision}>Add Division</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={showSubjectDialog} onOpenChange={setShowSubjectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Subject</DialogTitle>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='subjectName'>Subject Name</Label>
              <Input
                id='subjectName'
                value={newSubject.name}
                onChange={(e) =>
                  setNewSubject({ ...newSubject, name: e.target.value })
                }
              />
            </div>
          </div>
          <div className='flex justify-end gap-2'>
            <Button
              variant='outline'
              onClick={() => setShowSubjectDialog(false)}>
              Cancel
            </Button>
            <Button onClick={addSubject}>Add Subject</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Course Dialog */}
      <Dialog open={showCourseDialog} onOpenChange={setShowCourseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='courseName'>Course Name</Label>
              <Input
                id='courseName'
                value={newCourse.name}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, name: e.target.value })
                }
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='courseDescription'>Course Description</Label>
              <Input
                id='courseDescription'
                value={newCourse.description}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, description: e.target.value })
                }
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='courseCredits'>Credits</Label>
              <Input
                id='courseCredits'
                type='number'
                value={newCourse.credits}
                onChange={(e) =>
                  setNewCourse({
                    ...newCourse,
                    credits: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>
          <div className='flex justify-end gap-2'>
            <Button
              variant='outline'
              onClick={() => setShowCourseDialog(false)}>
              Cancel
            </Button>
            <Button onClick={addCourse}>Add Course</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the{" "}
              {itemToDelete?.type}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (!itemToDelete) return;

                switch (itemToDelete.type) {
                  case "class":
                    deleteClass(itemToDelete.id);
                    break;
                  case "division":
                    if (itemToDelete.parentId) {
                      deleteDivision(itemToDelete.parentId, itemToDelete.id);
                    }
                    break;
                  case "subject":
                    if (itemToDelete.parentId) {
                      deleteSubject(itemToDelete.parentId, itemToDelete.id);
                    }
                    break;
                  case "course":
                    if (itemToDelete.parentId) {
                      deleteCourse(itemToDelete.parentId, itemToDelete.id);
                    }
                    break;
                }
              }}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ClassesManagement;
