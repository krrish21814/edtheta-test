/* eslint-disable @typescript-eslint/no-explicit-any */
import School from "@/models/school";
import dbConnect from "@/utils/db-connect";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import sharp from "sharp";

export const config = {
  api: {
    bodyParser: false,
  },
};

const schoolSchema = z.object({
  name: z.string().min(1, "School name is required"),
  address: z.string().min(1, "Address is required"),
  email: z.string().email("Invalid email address"),
  contactNumber: z.string().min(1, "Contact number is required"),
  schoolCode: z.string().min(1, "School code is required"),
  geoLocation: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  timing: z.object({
    start: z.string(),
    end: z.string(),
  }),
  amenities: z.array(z.string()),
  description: z.string(),
  foundedIn: z.number(),
  board: z.string(),
  attributes: z.object({
    studentCapacity: z.number(),
    teachersCount: z.number(),
    campusSize: z.string(),
    studentTeacherRatio: z.number().optional(),
  }),
  accreditations: z.array(z.string()),
});

async function parseFormData(req: NextRequest) {
  const formData = await req.formData();
  const fields: Record<string, any> = {};
  let photo: File | null = null;

  for (const [key, value] of formData.entries()) {
    if (key === "photo") {
      photo = value as File;
    } else {
      try {
        // Try to parse JSON strings for nested objects/arrays
        fields[key] = JSON.parse(value as string);
      } catch {
        // If not JSON, use the raw value
        fields[key] = value;
      }
    }
  }

  return { fields, photo };
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Parse the form data using the native formData() method
    const { fields, photo } = await parseFormData(req);

    // Validate form fields
    const validatedData = schoolSchema.parse(fields);

    // Handle photo upload and compression
    let photoBase64: string | undefined;
    if (photo) {
      const photoBuffer = await photo.arrayBuffer();
      const compressedPhoto = await sharp(Buffer.from(photoBuffer))
        .resize({ width: 800 })
        .jpeg({ quality: 80 })
        .toBuffer();

      if (compressedPhoto.length > 200 * 1024) {
        throw new Error("Photo exceeds the 200KB limit even after compression");
      }

      photoBase64 = compressedPhoto.toString("base64");
    }

    // Create a new school entry
    const school = new School({
      ...validatedData,
      photo: photoBase64,
    });

    await school.save();

    return NextResponse.json(
      { success: true },
      {
        status: 201,
        statusText: "School created successfully",
      }
    );
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { message: err.message },
      { status: 500, statusText: "Internal server error" }
    );
  }
}
