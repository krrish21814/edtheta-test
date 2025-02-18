import { Schema } from "mongoose";

const StaffSchema = new Schema({
  // Additional fields specific to teacher
  school: { type: Schema.Types.ObjectId, ref: "School", required: true }, // The school the teacher belongs to
  qualifications: [{ type: String }], // Teacher's qualifications
  experience: { type: Number }, // Years of experience
  joiningDate: { type: Date }, // Date of joining the school
});

export default StaffSchema;
