// types/schedule.ts
import { Document, Types } from "mongoose";

export interface ISubject {
  _id: Types.ObjectId;
  name: string;
  code: string;
}

export interface IClass {
  _id: Types.ObjectId;
  name: string;
}

export interface ISubjectTeacher {
  _id: Types.ObjectId;
  subject: ISubject;
  teacher: Types.ObjectId;
}

export interface IPopulatedSection extends Document {
  _id: Types.ObjectId;
  name: string;
  class: IClass;
  subjectTeachers: ISubjectTeacher[];
}

export interface IScheduleItem {
  section: string;
  class: string;
  subjects: string[];
}

// Response type
export interface IScheduleResponse {
  success: boolean;
  data?: IScheduleItem[];
  message?: string;
  error?: string;
}
