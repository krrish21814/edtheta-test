import { Schema } from "mongoose";

const PrincipalSchema = new Schema({
  // Additional fields specific to principal
  school: { type: Schema.Types.ObjectId, ref: "School", required: true }, // The school the principal manages
  permissions: {
    type: [String],
    default: ["manage_teachers", "manage_students", "manage_classes"],
  },
});

export default PrincipalSchema;
