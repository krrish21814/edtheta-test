"use client";
import { X } from "lucide-react";

const Chip = ({
  label,
  selected,
  onClick,
  onRemove,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  onRemove?: () => void;
}) => (
  <div
    onClick={onClick}
    className={`
        inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm 
        cursor-pointer transition-all duration-200 m-1
        ${
          selected
            ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
            : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
        }
      `}>
    {label}
    {selected && onRemove && (
      <X
        size={14}
        className='hover:text-emerald-800'
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      />
    )}
  </div>
);

export default Chip;
