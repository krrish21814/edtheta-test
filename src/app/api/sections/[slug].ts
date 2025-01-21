/* eslint-disable @typescript-eslint/no-explicit-any */
import Section from "@/models/section";
import dbConnect from "@/utils/db-connect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { slug } = req.query;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const section = await Section.findOne({ slug })
          .populate("class", "name slug")
          .populate("classTeacher", "name email slug")
          .populate({
            path: "subjectTeachers",
            populate: {
              path: "subject teacher",
              select: "name email slug code",
            },
          })
          .populate("students", "name email slug");

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

    // Similar PUT and DELETE handlers
  }
}
