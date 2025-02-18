"use server";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import dbConnect from "@/utils/db-connect";
import { apiResponse } from "@/lib/api/response";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    // Parse form data
    const { token } = await req.json();
    // Validate required fields
    if (!token) {
      return NextResponse.json(apiResponse.error("Missing token"), {
        status: 400,
      });
    }

    // Find user by email
    const { payload: jwtData } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );
    const decoded = jwtData;
    if (!decoded) {
      return NextResponse.json(apiResponse.error("Invalid token"), {
        status: 401,
      });
    }

    const userData = {
      slug: decoded.slug,
      email: decoded.email,
      school_slug: decoded.school_slug,
      role: decoded.role,
      profilePhoto: decoded.profilePhoto,
      name: decoded.name,
    };

    const response = NextResponse.json(
      apiResponse.success(userData, "verified successful"),
      {
        status: 200,
      }
    );

    return response;
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(apiResponse.error("Login failed", err.message), {
      status: 500,
    });
  }
}
