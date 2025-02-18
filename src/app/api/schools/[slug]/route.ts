import { apiResponse } from "@/lib/api/response";
import School from "@/models/school";
import dbConnect from "@/utils/db-connect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  await dbConnect();

  try {
    const slug = (await params).slug;
    const school = await School.findOne({ slug: slug });

    return NextResponse.json(apiResponse.success(school, "School fetched"), {
      status: 200,
      statusText: "school fetched",
    });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(apiResponse.error(err.message, err.message), {
      status: 500,
      statusText: "bad request",
    });
  }
}
