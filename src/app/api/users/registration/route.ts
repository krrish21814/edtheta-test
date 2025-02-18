import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db-connect";
import { apiResponse } from "@/lib/api/response";
import { uploadToCloudinary } from "@/utils/cloudinary-upload";
import { User, IUser } from "@/models/user";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    // Parse form data
    const formData = await req.formData();

    // Extract fields
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const role = formData.get("role") as IUser["role"];
    const profilePhotoFile = formData.get("profilePhoto") as File | null;

    // Validate required fields
    if (!email || !password || !name || !role) {
      return NextResponse.json(apiResponse.error("Missing required fields"), {
        status: 400,
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        apiResponse.error("User with this email already exists"),
        { status: 400 }
      );
    }

    // Handle profile photo upload
    let profilePhotoUrl;
    if (profilePhotoFile && profilePhotoFile.size > 0) {
      const bytes = await profilePhotoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      profilePhotoUrl = await uploadToCloudinary(buffer, "user_profiles");
    }
    // Create new user
    const user = new User({
      email,
      password,
      name,
      role,
      profilePhoto: profilePhotoUrl,
      isVerified: false,
    });

    await user.save();

    // Prepare response (exclude sensitive info)

    return NextResponse.json(
      apiResponse.success({
        data: user,
        message:
          "Thank you for registering! Your dashboard will be activated once we approve your account.",
      }),
      { status: 201 }
    );
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      apiResponse.error("Registration failed", err.message),
      { status: 500 }
    );
  }
}
