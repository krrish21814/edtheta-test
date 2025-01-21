import { generateSlug } from "@/utils/slug-generator";
import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: "admin" | "principal" | "teacher" | "student" | "parent";
  slug: string;
  school: Schema.Types.ObjectId;
  teachingSubjects?: Schema.Types.ObjectId[]; // For teachers
  classTeacherOf?: Schema.Types.ObjectId; // For teachers
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    slug: { type: String, unique: true },
    school: { type: Schema.Types.ObjectId, ref: "School" },
    teachingSubjects: [{ type: Schema.Types.ObjectId, ref: "Subject" }],
    classTeacherOf: { type: Schema.Types.ObjectId, ref: "Section" },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.slug) {
    this.slug = await generateSlug(this.name, "User");
  }

  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
