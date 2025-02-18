import { apiResponse } from "@/lib/api/response";
import School from "@/models/school";
import { User } from "@/models/user";
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

    if (!school) {
      return NextResponse.json(
        apiResponse.error("School not found", "School not found"),
        { status: 404, statusText: "Not Found" }
      );
    }

    // Aggregate teacher statistics
    const teacherStats = await User.aggregate([
      {
        $match: {
          role: "teacher",
          school: school._id,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          approved: {
            $sum: { $cond: { if: "$isApproved", then: 1, else: 0 } },
          },
        },
      },
    ]);

    const staffStats = await User.aggregate([
      {
        $match: {
          role: "staff",
          school: school._id,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          approved: {
            $sum: { $cond: { if: "$isApproved", then: 1, else: 0 } },
          },
        },
      },
    ]);

    const totalTeachers = teacherStats[0]?.total || 0;
    const approvedTeachers = teacherStats[0]?.approved || 0;
    const totalStaff = staffStats[0]?.total || 0;

    // Format the response
    const formattedStats = [
      {
        label: "Total Teachers",
        value: totalTeachers.toLocaleString(),
        icon: "Users",
      },
      {
        label: "Approved Teachers",
        value: approvedTeachers.toLocaleString(),
        icon: "CheckCircle",
      },
      { label: "Total Staff", value: `${totalStaff}`, icon: "Award" },
    ];

    return NextResponse.json(
      apiResponse.success(formattedStats, "Teacher stats fetched successfully"),
      { status: 200, statusText: "OK" }
    );
  } catch (error) {
    const err = error as Error;
    console.log("rrot", err.message);
    return NextResponse.json(apiResponse.error(err.message, err.message), {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
