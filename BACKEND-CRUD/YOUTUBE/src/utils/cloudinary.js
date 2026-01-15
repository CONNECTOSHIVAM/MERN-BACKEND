import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv"
import fs from "fs";
import path from "path";
dotenv.config()






cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const normalizedPath = path.resolve(localFilePath);

    const response = await cloudinary.uploader.upload(normalizedPath, {
      resource_type: "auto",
    });

    console.log("✅ Uploaded to Cloudinary:", response.url);

    // remove temp file
    if (fs.existsSync(normalizedPath)) fs.unlinkSync(normalizedPath);

    return response;
  } catch (error) {
    console.log("❌ Cloudinary Upload Error:", error.message);

    const normalizedPath = path.resolve(localFilePath);
    if (fs.existsSync(normalizedPath)) fs.unlinkSync(normalizedPath);

    return null;
  }
};

export { uploadOnCloudinary };
