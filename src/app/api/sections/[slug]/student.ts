/* eslint-disable @typescript-eslint/no-explicit-any */
import Section from "@/models/section";
import {User} from "@/models/user";
import dbConnect from "@/utils/db-connect";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { slug } = req.query;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { studentSlug } = req.body;
        const student = await User.findOne({
          slug: studentSlug,
          role: "student",
        });

        if (!student) {
          return res
            .status(404)
            .json({ success: false, message: "Student not found" });
        }

        const section = await Section.findOneAndUpdate(
          { slug },
          { $addToSet: { students: student._id } },
          { new: true }
        ).populate("students", "name email slug");

        if (!section) {
          return res
            .status(404)
            .json({ success: false, message: "Section not found" });
        }

        res.status(200).json({ success: true, data: section });
      } catch (error: any) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "DELETE":
      try {
        const studentSlug = req.query.studentSlug as string;
        const student = await User.findOne({
          slug: studentSlug,
          role: "student",
        });

        if (!student) {
          return res
            .status(404)
            .json({ success: false, message: "Student not found" });
        }

        const section = await Section.findOneAndUpdate(
          { slug },
          { $pull: { students: student._id } },
          { new: true }
        ).populate("students", "name email slug");

        if (!section) {
          return res
            .status(404)
            .json({ success: false, message: "Section not found" });
        }

        res.status(200).json({ success: true, data: section });
      } catch (error: any) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
}
