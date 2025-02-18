"use server";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import * as jose from "jose";
import dbConnect from "@/utils/db-connect";
import { apiResponse } from "@/lib/api/response";
import { User } from "@/models/user";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    // Parse form data
    const formData = await req.formData();

    // Extract fields
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(apiResponse.error("Missing email or password"), {
        status: 400,
      });
    }

    // Find user by email
    const user = await User.findOne({ email }).populate({
      path: "school",
    });
    if (!user) {
      return NextResponse.json(apiResponse.error("Invalid email or password"), {
        status: 401,
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(apiResponse.error("Invalid email or password"), {
        status: 401,
      });
    }

    // Check user verification status (optional)
    if (!user.isApproved) {
      return NextResponse.json(
        apiResponse.error("Account not approved. Please contact admin."),
        { status: 403 }
      );
    }

    // Generate JWT token (21 days validity)
    const token = await new jose.SignJWT({
      slug: user.slug,
      email: user.email,
      school_slug: user.school.slug,
      role: user.role,
      profilePhoto: user.profilePhoto,
      name: user.name,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30d")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET!));

    // Prepare user data for response (excluding sensitive info)
    const userData = {
      slug: user.slug,
      name: user.name,
      email: user.email,
      role: user.role,
      profilePhoto: user.profilePhoto,
      isVerified: user.isVerified,
      access_token: token,
    };

    const response = NextResponse.json(
      apiResponse.success(userData, "Login successful"),
      {
        status: 200,
      }
    );

    return response;
  } catch (error) {
    const err = error as Error;
    console.log("err", err.message);
    return NextResponse.json(apiResponse.error("Login failed", err.message), {
      status: 500,
    });
  }
}
