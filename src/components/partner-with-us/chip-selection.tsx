"use client";
import { ChipOption } from "@/utils/constants";
import Chip from "./chip";

const ChipSelection = ({
  options,
  selected,
  onChange,
  label,
}: {
  options: ChipOption[];
  selected: string[];
  onChange: (values: string[]) => void;
  label: string;
}) => {
  const toggleOption = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];
    onChange(newSelected);
  };

  return (
    <div className='space-y-2'>
      <label className='block text-sm font-medium text-gray-700'>{label}</label>
      <div className='p-2 border rounded-md bg-white min-h-[100px]'>
        <div className='mb-2'>
          <p className='text-sm text-gray-500'>Selected:</p>
          <div className='flex flex-wrap gap-1'>
            {selected.length === 0 && (
              <p className='text-sm text-gray-400 p-1'>No items selected</p>
            )}
            {selected.map((value) => (
              <Chip
                key={value}
                label={
                  options.find((opt) => opt.value === value)?.label || value
                }
                selected={true}
                onClick={() => {}}
                onRemove={() => toggleOption(value)}
              />
            ))}
          </div>
        </div>
        <div className='border-t pt-2'>
          <p className='text-sm text-gray-500 mb-1'>Available:</p>
          <div className='flex flex-wrap gap-1'>
            {options
              .filter((option) => !selected.includes(option.value))
              .map((option) => (
                <Chip
                  key={option.value}
                  label={option.label}
                  selected={false}
                  onClick={() => toggleOption(option.value)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChipSelection;
