"use client";

interface FacultyDialogProps {
  faculty: {
    name: string;
    title: string;
    department: string;
    bio: string;
    imageUrl: string;
    id: string;
  };
  setFaculty: React.Dispatch<
    React.SetStateAction<{
      name: string;
      title: string;
      department: string;
      bio: string;
      imageUrl: string;
      id: string;
    }>
  >;
  onSave: () => void;
  onClose: () => void;
}

export const FacultyDialog = ({
  faculty,
  setFaculty,
  onSave,
  onClose,
}: FacultyDialogProps) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-1/2'>
        <h3 className='font-semibold text-gray-800'>
          {faculty.id ? "Edit Faculty" : "Add Faculty"}
        </h3>
        <input
          type='text'
          value={faculty.name}
          onChange={(e) => setFaculty({ ...faculty, name: e.target.value })}
          placeholder='Name'
          className='w-full p-2 mt-3 border rounded-lg focus:outline-emerald-500'
        />
        <input
          type='text'
          value={faculty.title}
          onChange={(e) => setFaculty({ ...faculty, title: e.target.value })}
          placeholder='Title'
          className='w-full p-2 mt-3 border rounded-lg focus:outline-emerald-500'
        />
        <input
          type='text'
          value={faculty.department}
          onChange={(e) =>
            setFaculty({ ...faculty, department: e.target.value })
          }
          placeholder='Department'
          className='w-full p-2 mt-3 border rounded-lg focus:outline-emerald-500'
        />
        <textarea
          value={faculty.bio}
          onChange={(e) => setFaculty({ ...faculty, bio: e.target.value })}
          placeholder='Bio'
          className='w-full p-2 mt-3 border rounded-lg focus:outline-emerald-500'
        />
        <input
          type='text'
          value={faculty.imageUrl}
          onChange={(e) => setFaculty({ ...faculty, imageUrl: e.target.value })}
          placeholder='Image URL'
          className='w-full p-2 mt-3 border rounded-lg focus:outline-emerald-500'
        />
        <div className='mt-4'>
          <button
            onClick={onSave}
            className='px-4 py-2 bg-emerald-600 text-white rounded-lg mr-2'>
            Save
          </button>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-gray-300 text-black rounded-lg'>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
