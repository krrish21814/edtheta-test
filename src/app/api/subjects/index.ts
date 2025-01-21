/* eslint-disable @typescript-eslint/no-explicit-any */
import Subject from "@/models/subject";
import dbConnect from "@/utils/db-connect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const subjects = await Subject.find({}).populate("school", "name slug");
        res.status(200).json({ success: true, data: subjects });
      } catch (error: any) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "POST":
      try {
        const subject = await Subject.create(req.body);
        res.status(201).json({ success: true, data: subject });
      } catch (error: any) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: "Method not allowed" });
      break;
  }
}
