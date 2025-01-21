/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/utils/db-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import School from "../../../../models/school";

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
        const school = await School.findOne({ slug }).populate(
          "principal",
          "name email slug"
        );

        if (!school) {
          return res
            .status(404)
            .json({ success: false, message: "School not found" });
        }

        res.status(200).json({ success: true, data: school });
      } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case "PUT":
      try {
        const school = await School.findOneAndUpdate({ slug }, req.body, {
          new: true,
          runValidators: true,
        });

        if (!school) {
          return res
            .status(404)
            .json({ success: false, message: "School not found" });
        }

        res.status(200).json({ success: true, data: school });
      } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case "DELETE":
      try {
        const deletedSchool = await School.findOneAndDelete({ slug });

        if (!deletedSchool) {
          return res
            .status(404)
            .json({ success: false, message: "School not found" });
        }

        res.status(200).json({ success: true, data: {} });
      } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
