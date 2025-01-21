import { NextApiRequest, NextApiResponse } from "next";
import Section from "@/models/section";
import User from "@/models/user";
import dbConnect from "@/utils/db-connect";
import {
  IPopulatedSection,
  IScheduleResponse,
  IScheduleItem,
} from "@/types/schedule";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IScheduleResponse>
) {
  const { method } = req;
  const { slug } = req.query;

  await dbConnect();

  if (method === "GET") {
    try {
      const teacher = await User.findOne({ slug, role: "teacher" });

      if (!teacher) {
        return res
          .status(404)
          .json({ success: false, message: "Teacher not found" });
      }

      // Find all sections where this teacher teaches
      const sections = (await Section.find({
        "subjectTeachers.teacher": teacher._id,
      })
        .populate("class", "name")
        .populate({
          path: "subjectTeachers",
          match: { teacher: teacher._id },
          populate: { path: "subject", select: "name code" },
        })) as IPopulatedSection[];

      const schedule: IScheduleItem[] = sections.map((section) => ({
        section: section.name,
        class: section.class.name,
        subjects: section.subjectTeachers.map((st) => st.subject.name),
      }));

      res.status(200).json({ success: true, data: schedule });
    } catch (error) {
      const err = error as Error;
      res.status(400).json({ success: false, error: err.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
