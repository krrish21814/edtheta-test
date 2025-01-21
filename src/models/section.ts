import { generateSlug } from "@/utils/slug-generator";
import mongoose, { Schema } from "mongoose";

export interface ISection extends Document {
  name: string; // e.g., "A", "B"
  class: Schema.Types.ObjectId;
  classTeacher: Schema.Types.ObjectId;
  students: Schema.Types.ObjectId[];
  subjectTeachers: [
    {
      subject: Schema.Types.ObjectId;
      teacher: Schema.Types.ObjectId;
    }
  ];
  slug: string;
}

const SectionSchema = new Schema<ISection>(
  {
    name: { type: String, required: true },
    class: { type: Schema.Types.ObjectId, ref: "Class", required: true },
    classTeacher: { type: Schema.Types.ObjectId, ref: "User", required: true },
    students: [{ type: Schema.Types.ObjectId, ref: "User" }],
    subjectTeachers: [
      {
        subject: {
          type: Schema.Types.ObjectId,
          ref: "Subject",
          required: true,
        },
        teacher: { type: Schema.Types.ObjectId, ref: "User", required: true },
      },
    ],
    slug: { type: String, unique: true },
  },
  { timestamps: true }
);

SectionSchema.pre("save", async function (next) {
  if (!this.slug) {
    const className = await mongoose
      .model("Class")
      .findById(this.class)
      .select("name");
    this.slug = await generateSlug(`${className.name}-${this.name}`, "Section");
  }
  next();
});

const Section =
  mongoose.models.Section || mongoose.model<ISection>("Section", SectionSchema);
export default Section;
