/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

export const ConfirmationDialog = ({ onConfirm, onCancel }: any) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-1/3'>
        <h3 className='font-semibold text-gray-800'>
          Are you sure you want to delete this faculty member?
        </h3>
        <div className='mt-4'>
          <button
            onClick={onConfirm}
            className='px-4 py-2 bg-red-600 text-white rounded-lg mr-2'>
            Yes, Delete
          </button>
          <button
            onClick={onCancel}
            className='px-4 py-2 bg-gray-300 text-black rounded-lg'>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
