import { Schema } from "mongoose";

const AdminSchema = new Schema({
  // Additional fields specific to admin
  permissions: {
    type: [String],
    default: ["manage_users", "manage_schools", "manage_settings"],
  },
  isSuperAdmin: { type: Boolean, default: false }, // Indicates if the admin has full system access
});

export default AdminSchema;
