import { Schema } from "mongoose";

const StudentSchema = new Schema({
  // Additional fields specific to student
  school: { type: Schema.Types.ObjectId, ref: "School", required: true }, // The school the student belongs to
  class: { type: Schema.Types.ObjectId, ref: "Class", required: true }, // The class the student is enrolled in
  section: { type: Schema.Types.ObjectId, ref: "Section" }, // The section the student belongs to
  parentId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the parent
  dateOfBirth: { type: Date, required: true }, // Student's date of birth
  admissionDate: { type: Date, required: true }, // Date of admission
  rollNumber: { type: String, required: true, unique: true }, // Unique roll number for the student
  address: { type: String }, // Student's address
});

export default StudentSchema;
