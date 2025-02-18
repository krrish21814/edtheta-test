import { School } from "./school";

export type User = {
  email: string;
  password: string;
  name: string;
  profilePhoto?: string;
  isBlocked: boolean;
  isVerified: boolean;
  isApproved: boolean;
  role: "admin" | "principal" | "teacher" | "student" | "parent";
  slug: string;
  school: School;
  school_slug: string;
  access_token: string;
};
