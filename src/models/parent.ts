import { Schema } from "mongoose";

const ParentSchema = new Schema({
  // Additional fields specific to parent
  children: [{ type: Schema.Types.ObjectId, ref: "User" }], // References to the parent's children (students)
  occupation: { type: String }, // Parent's occupation
  address: { type: String }, // Parent's address
  emergencyContact: { type: String }, // Emergency contact number
});

export default ParentSchema;
