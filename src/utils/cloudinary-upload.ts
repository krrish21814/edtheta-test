import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(
  buffer: Buffer,
  folder: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    // Upload buffer directly
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          allowed_formats: ["jpg", "png", "jpeg", "gif"],
          transformation: [{ width: 500, height: 500, crop: "limit" }],
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error("Upload failed"));
          resolve(result.secure_url);
        }
      )
      .end(buffer);
  });
}
