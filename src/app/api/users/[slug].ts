/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/models/user";
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
        const user = await User.findOne({ slug })
          .select("-password")
          .populate("user", "name slug");

        if (!user) {
          return res
            .status(404)
            .json({ success: false, message: "user not found" });
        }

        res.status(200).json({ success: true, data: user });
      } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case "PUT":
      try {
        const user = await User.findOneAndUpdate({ slug }, req.body, {
          new: true,
          runValidators: true,
        });

        if (!user) {
          return res
            .status(404)
            .json({ success: false, message: "user not found" });
        }

        res.status(200).json({ success: true, data: user });
      } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case "DELETE":
      try {
        const deletedUser = await User.findOneAndDelete({ slug });

        if (!deletedUser) {
          return res
            .status(404)
            .json({ success: false, message: "user not found" });
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
