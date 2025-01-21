import Class from "@/models/class";
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
        const classData = await Class.findOne({ slug })
          .populate("school", "name slug")
          .populate("sections")
          .populate("subjects", "name code slug");

        if (!classData) {
          return res
            .status(404)
            .json({ success: false, message: "Class not found" });
        }
        res.status(200).json({ success: true, data: classData });
      } catch (error) {
        const err = error as Error;
        res.status(400).json({ success: false, error: err.message });
      }
      break;

    // Similar PUT and DELETE handlers
  }
}
