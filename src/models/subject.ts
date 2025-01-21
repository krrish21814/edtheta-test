import { generateSlug } from "@/utils/slug-generator";
import mongoose, { Document, Schema } from "mongoose";

export interface ISubject extends Document {
  name: string;
  code: string;
  slug: string;
  school: Schema.Types.ObjectId;
}

const SubjectSchema = new Schema<ISubject>(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    slug: { type: String, unique: true },
    school: { type: Schema.Types.ObjectId, ref: "School", required: true },
  },
  { timestamps: true }
);

SubjectSchema.pre("save", async function (next) {
  if (!this.slug) {
    this.slug = await generateSlug(this.name, "Subject");
  }
  next();
});

const Subject =
  mongoose.models.Subject || mongoose.model<ISubject>("Subject", SubjectSchema);
export default Subject;
