import School from "@/models/school";
import dbConnect from "@/utils/db-connect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const latitude = req.nextUrl.searchParams.get("latitude");
    const longitude = req.nextUrl.searchParams.get("longitude");
    const radius = req.nextUrl.searchParams.get("radius");
    if (!latitude || !longitude || !radius) {
      return NextResponse.json(
        {
          success: false,
          message: "latitude, longitude, and radius are required",
        },
        { status: 400, statusText: "Missing keys" }
      );
    }

    const schools = await School.find({
      geoLocation: {
        $geoWithin: {
          $centerSphere: [
            [parseFloat(latitude), parseFloat(longitude)],
            parseFloat(radius) / 6378.1, // Convert km to radians
          ],
        },
      },
    });

    return NextResponse.json(
      { success: true, schools },
      { status: 200, statusText: "schools fetched" }
    );
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500, statusText: "bad request" }
    );
  }
}
