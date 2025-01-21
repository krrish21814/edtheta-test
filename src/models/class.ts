import { generateSlug } from "@/utils/slug-generator";
import mongoose, { Schema } from "mongoose";

export interface IClass extends Document {
  name: string; // e.g., "Class 10"
  school: Schema.Types.ObjectId;
  sections: Schema.Types.ObjectId[];
  subjects: Schema.Types.ObjectId[];
  slug: string;
}

const ClassSchema = new Schema<IClass>(
  {
    name: { type: String, required: true },
    school: { type: Schema.Types.ObjectId, ref: "School", required: true },
    sections: [{ type: Schema.Types.ObjectId, ref: "Section" }],
    subjects: [{ type: Schema.Types.ObjectId, ref: "Subject" }],
    slug: { type: String, unique: true },
  },
  { timestamps: true }
);

ClassSchema.pre("save", async function (next) {
  if (!this.slug) {
    this.slug = await generateSlug(this.name, "Class");
  }
  next();
});

const Class =
  mongoose.models.Class || mongoose.model<IClass>("Class", ClassSchema);
export default Class;
