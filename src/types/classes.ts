// types.ts
export interface Course {
  id: string;
  name: string;
  description: string;
  credits: number;
}

export interface Subject {
  id: string;
  name: string;
  courses: Course[];
}

export interface Division {
  id: string;
  name: string;
  subjects: Subject[];
}

export interface Class {
  id: string;
  name: string;
  divisions: Division[];
}

export interface ItemToDelete {
  type: "class" | "division" | "subject" | "course";
  id: string;
  parentId?: string;
}
