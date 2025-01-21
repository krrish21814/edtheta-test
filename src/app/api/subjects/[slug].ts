/* eslint-disable @typescript-eslint/no-explicit-any */
import Subject from "@/models/subject";
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
    case "GET":
      try {
        const subject = await Subject.findOne({ slug }).populate(
          "school",
          "name slug"
        );

        if (!subject) {
          return res
            .status(404)
            .json({ success: false, message: "Subject not found" });
        }
        res.status(200).json({ success: true, data: subject });
      } catch (error: any) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "PUT":
      try {
        const subject = await Subject.findOneAndUpdate({ slug }, req.body, {
          new: true,
          runValidators: true,
        });
        if (!subject) {
          return res
            .status(404)
            .json({ success: false, message: "Subject not found" });
        }
        res.status(200).json({ success: true, data: subject });
      } catch (error: any) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "DELETE":
      try {
        const subject = await Subject.findOneAndDelete({ slug });
        if (!subject) {
          return res
            .status(404)
            .json({ success: false, message: "Subject not found" });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error: any) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
}
