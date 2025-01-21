import { generateSlug } from "@/utils/slug-generator";
import mongoose, { Schema } from "mongoose";

export interface ISchool extends Document {
  name: string;
  address: string;
  email: string;
  contactNumber: string;
  slug: string;
  principal: Schema.Types.ObjectId;
  schoolCode: string;
  ratings: number;
  geoLocation: {
    latitude: number;
    longitude: number;
  };
  timing: {
    start: string;
    end: string;
  };
  amenities: string[];
  description: string;
  foundedIn: number;
  board: string;
  attributes: {
    studentCapacity: number;
    teachersCount: number;
    campusSize: string;
    studentTeacherRatio?: number;
  };
  accreditations: string[];
  isApproved: boolean;
  isVerified: boolean;
  photo?: string; // Stores the base64 string of the image
}

const SchoolSchema = new Schema<ISchool>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNumber: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    principal: { type: Schema.Types.ObjectId, ref: "User" },
    schoolCode: { type: String, required: true, unique: true },
    ratings: { type: Number, min: 0, max: 5, default: 0 },
    geoLocation: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    timing: {
      start: { type: String, required: true },
      end: { type: String, required: true },
    },
    amenities: { type: [String], default: [] },
    description: { type: String, default: "" },
    foundedIn: { type: Number, required: true },
    board: { type: String, required: true },
    attributes: {
      studentCapacity: { type: Number, required: true },
      teachersCount: { type: Number, required: true },
      campusSize: { type: String, required: true },
    },
    accreditations: { type: [String], default: [] },
    isApproved: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    photo: { type: String, required: true }, // Store compressed image as base64 string
  },
  { timestamps: true }
);

// Add a virtual field to calculate student-teacher ratio
SchoolSchema.virtual("attributes.studentTeacherRatio").get(function (
  this: ISchool
) {
  if (this.attributes.studentCapacity && this.attributes.teachersCount) {
    return this.attributes.studentCapacity / this.attributes.teachersCount;
  }
  return undefined; // Return undefined if data is incomplete
});

// Ensure 2dsphere index for geolocation queries
SchoolSchema.index({ geoLocation: "2dsphere" });

SchoolSchema.pre("save", async function (next) {
  if (!this.slug) {
    this.slug = await generateSlug(this.name, "School");
  }
  next();
});

// // Function to compress and save image
// SchoolSchema.methods.setPhoto = async function (
//   imageBuffer: Buffer
// ): Promise<void> {
//   try {
//     const compressedImage = await sharp(imageBuffer)
//       .resize({ width: 800 }) // Resize to maintain a reasonable dimension
//       .jpeg({ quality: 80 }) // Adjust quality to control compression
//       .toBuffer();

//     if (compressedImage.length > 200 * 1024) {
//       throw new Error("Image exceeds the 200KB limit even after compression");
//     }

//     this.photo = compressedImage.toString("base64");
//   } catch (error) {
//     const err = error as Error;
//     throw new Error("Failed to compress and set the photo: " + err.message);
//   }
// };

const School =
  mongoose.models.School || mongoose.model<ISchool>("School", SchoolSchema);
export default School;
