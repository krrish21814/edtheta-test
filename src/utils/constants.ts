export interface ChipOption {
  value: string;
  label: string;
}

export const amenitiesOptions: ChipOption[] = [
  { value: "Library", label: "Library" },
  { value: "Swimming Pool", label: "Swimming Pool" },
  { value: "Sports Ground", label: "Sports Ground" },
  { value: "Computer Lab", label: "Computer Lab" },
  { value: "Science Lab", label: "Science Lab" },
  { value: "Auditorium", label: "Auditorium" },
  { value: "Cafeteria", label: "Cafeteria" },
  { value: "Smart Classrooms", label: "Smart Classrooms" },
  { value: "Transport", label: "Transport Facility" },
  { value: "Medical Room", label: "Medical Room" },
];

export const accreditationOptions: ChipOption[] = [
  { value: "ISO 9001", label: "ISO 9001" },
  { value: "NABET", label: "NABET" },
  { value: "NAAC", label: "NAAC" },
  { value: "Green School", label: "Green School" },
  { value: "Digital School", label: "Digital School" },
];
