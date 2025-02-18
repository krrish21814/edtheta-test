import { generateSlug } from "@/utils/slug-generator";
import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";
import AdminSchema from "./admin";
import PrincipalSchema from "./principal";
import TeacherSchema from "./teacher";
import StudentSchema from "./student";
import ParentSchema from "./parent";
import StaffSchema from "./staff";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  profilePhoto?: string;
  isBlocked: boolean;
  isVerified: boolean;
  isApproved: boolean;
  role: "admin" | "principal" | "teacher" | "student" | "parent";
  slug: string;
  school?: Schema.Types.ObjectId;
  teachingSubjects?: Schema.Types.ObjectId[];
  classTeacherOf?: Schema.Types.ObjectId;
  phone: string;
  isMobileVerified: boolean;
  parentId?: Schema.Types.ObjectId;
  gender?: string;
  address?: string;
  dateOfBirth: Date;
  geoCode?: {
    lat: number;
    lng: number;
  };
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Base User Schema
const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    profilePhoto: { type: String },
    isBlocked: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    role: {
      type: String,
      required: true,
      enum: ["admin", "principal", "teacher", "student", "parent", "staff"],
    },
    slug: { type: String, unique: true },
    school: { type: Schema.Types.ObjectId, ref: "School" },
    teachingSubjects: [{ type: Schema.Types.ObjectId, ref: "Subject" }],
    classTeacherOf: { type: Schema.Types.ObjectId, ref: "Section" },
    phone: { type: String, unique: true },
    isMobileVerified: { type: Boolean, default: false },
    parentId: { type: Schema.Types.ObjectId, ref: "User" },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    dateOfBirth: { type: Date, required: true },
    address: {
      type: String,
      required: false,
    },
    geoCode: {
      lat: {
        type: Number,
        default: 0.0,
      },
      lng: {
        type: Number,
        default: 0.0,
      },
    },
  },
  { timestamps: true, discriminatorKey: "role" }
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
// Role-specific discriminators
const Admin = mongoose.models.Admin || User.discriminator("admin", AdminSchema);
const Principal =
  mongoose.models.Principal || User.discriminator("principal", PrincipalSchema);
const Teacher =
  mongoose.models.Teacher || User.discriminator("teacher", TeacherSchema);
const Student =
  mongoose.models.Student || User.discriminator("student", StudentSchema);
const Parent =
  mongoose.models.Parent || User.discriminator("parent", ParentSchema);
const Staff = mongoose.models.Staff || User.discriminator("staff", StaffSchema);

export { User, Admin, Principal, Teacher, Student, Parent, Staff };
