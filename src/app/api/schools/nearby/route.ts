/* eslint-disable @typescript-eslint/no-explicit-any */
import School from "@/models/school";
import dbConnect from "@/utils/db-connect";
import { NextRequest, NextResponse } from "next/server";
import { apiResponse } from "@/lib/api/response";
import { calculateDistance } from "@/utils/geo-utils";

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    // Extract query parameters
    const latitude = req.nextUrl.searchParams.get("latitude");
    const longitude = req.nextUrl.searchParams.get("longitude");
    const radius = req.nextUrl.searchParams.get("radius");
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10");

    // Filters
    const amenities = req.nextUrl.searchParams.get("amenities")?.split(",");
    const minRating = parseFloat(
      req.nextUrl.searchParams.get("minRating") || "0"
    );
    const board = req.nextUrl.searchParams.get("board");

    // Validate required parameters
    if (!latitude || !longitude || !radius) {
      return NextResponse.json(
        apiResponse.error("latitude, longitude, and radius are required"),
        { status: 400, statusText: "Missing keys" }
      );
    }

    // Build query object
    const query: any = {
      geoLocation: {
        $geoWithin: {
          $centerSphere: [
            [parseFloat(latitude), parseFloat(longitude)],
            parseFloat(radius) / 6378.1, // Convert km to radians
          ],
        },
      },
    };

    // Add optional filters
    if (amenities && amenities.length > 0) {
      query.amenities = { $all: amenities };
    }

    if (minRating) {
      query.rating = { $gte: minRating };
    }

    if (board) {
      query.board = board;
    }

    // Pagination
    const skip = (page - 1) * limit;
    // Find schools with filters and pagination
    const schools = await School.find(query).skip(skip).limit(limit);

    // Count total matching schools for pagination info
    const totalSchools = await School.countDocuments(query);

    // Enrich schools with distance information
    const enrichedSchools = schools.map((school) => {
      const distance = calculateDistance(
        parseFloat(latitude),
        parseFloat(longitude),
        school.geoLocation.latitude,
        school.geoLocation.longitude
      );

      return {
        ...school.toObject(),
        distanceAway: `${distance.toFixed(2)} km`,
      };
    });

    // Prepare pagination metadata
    const paginationInfo = {
      currentPage: page,
      totalPages: Math.ceil(totalSchools / limit),
      totalSchools,
      pageSize: limit,
    };

    // Return response
    const response =
      enrichedSchools.length > 0
        ? NextResponse.json(
            apiResponse.success(
              {
                data: enrichedSchools,
                pagination: paginationInfo,
              },
              "Schools fetched successfully"
            ),
            { status: 200, statusText: "OK" }
          )
        : NextResponse.json(
            apiResponse.error("No schoo; found", "No schoo; found"),
            { status: 400, statusText: "Not found" }
          );
    return response;
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      apiResponse.error("An error occurred", err.message),
      { status: 500, statusText: "Internal Server Error" }
    );
  }
}
