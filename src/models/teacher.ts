import { Schema } from "mongoose";

const TeacherSchema = new Schema({
  // Additional fields specific to teacher
  school: { type: Schema.Types.ObjectId, ref: "School", required: true }, // The school the teacher belongs to
  teachingSubjects: [{ type: Schema.Types.ObjectId, ref: "Subject" }], // Subjects taught by the teacher
  classTeacherOf: { type: Schema.Types.ObjectId, ref: "Section" }, // Class/Section the teacher is responsible for
  qualifications: [{ type: String }], // Teacher's qualifications
  experience: { type: Number }, // Years of experience
  joiningDate: { type: Date }, // Date of joining the school
});

export default TeacherSchema;
