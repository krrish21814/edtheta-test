"use client";

import { useState } from "react";
import { FacultyDialog } from "./faculty-dialog";
import { ConfirmationDialog } from "./confirm-dialog";

interface FacultyMember {
  id: string;
  name: string;
  title: string;
  department: string;
  bio: string;
  imageUrl: string; // Image URL for faculty
}

interface FacultySectionProps {
  faculty: FacultyMember[];
}

export const FacultySection = ({ faculty }: FacultySectionProps) => {
  const [newFaculty, setNewFaculty] = useState({
    name: "",
    title: "",
    department: "",
    bio: "",
    imageUrl: "",
    id: "",
  });

  const [editingFaculty, setEditingFaculty] = useState<FacultyMember | null>(
    null
  );
  const [showDialog, setShowDialog] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [facultyToDelete, setFacultyToDelete] = useState<FacultyMember | null>(
    null
  );

  const handleAddFaculty = () => {
    // Logic for adding faculty (e.g., send the data to the server or update state)
    console.log("New Faculty Added:", newFaculty);
    setShowDialog(false);
  };

  const handleDeleteFaculty = (facultyMember: FacultyMember) => {
    setFacultyToDelete(facultyMember);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteFaculty = () => {
    // Logic for deleting faculty (e.g., remove from state or send a request to delete)
    console.log("Faculty Deleted:", facultyToDelete?.id);
    setShowDeleteConfirmation(false);
  };

  const cancelDeleteFaculty = () => {
    setShowDeleteConfirmation(false);
    setFacultyToDelete(null);
  };

  return (
    <div className='mt-2'>
      {/* Add Faculty Button */}
      <div className='flex flex-col md:flex-row justify-between items-center'>
        <h2 className='text-lg font-bold text-emerald-600'>Faculty Members</h2>
        <button
          onClick={() => setShowDialog(true)}
          className='mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700'>
          Add Faculty
        </button>
      </div>
      {/* Display Faculty */}
      <div className='grid gap-4 mt-4'>
        {faculty.map((facultyMember) => (
          <div
            key={facultyMember.id}
            className='p-4 bg-gray-50 rounded-lg shadow-sm'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center'>
                <img
                  src={facultyMember.imageUrl}
                  alt={facultyMember.name}
                  className='w-16 h-16 rounded-full object-cover mr-4'
                />
                <h4 className='font-bold text-gray-800'>
                  {facultyMember.name}
                </h4>
              </div>
              <div>
                <button
                  onClick={() => {
                    setEditingFaculty(facultyMember);
                    setShowDialog(true);
                  }}
                  className='text-blue-600 mr-2'>
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteFaculty(facultyMember)}
                  className='text-red-600'>
                  Delete
                </button>
              </div>
            </div>
            <p className='text-sm text-gray-500 mt-2'>{facultyMember.title}</p>
            <p className='text-sm text-gray-500'>{facultyMember.department}</p>
            <p className='mt-2 text-gray-800'>{facultyMember.bio}</p>
          </div>
        ))}
      </div>

      {/* Add/Edit Faculty Dialog */}
      {showDialog && (
        <FacultyDialog
          faculty={editingFaculty ? editingFaculty : newFaculty}
          setFaculty={setNewFaculty}
          onSave={handleAddFaculty}
          onClose={() => setShowDialog(false)}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirmation && (
        <ConfirmationDialog
          onConfirm={confirmDeleteFaculty}
          onCancel={cancelDeleteFaculty}
        />
      )}
    </div>
  );
};
