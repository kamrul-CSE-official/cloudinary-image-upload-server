import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import envConfig from "../configs/envConfig";

// Configure Cloudinary
cloudinary.config({
  cloud_name: envConfig.cloudinary.cloudName,
  api_key: envConfig.cloudinary.apiKey,
  api_secret: envConfig.cloudinary.apiSecreat,
});

const uploadFileToCloudinary = async (filePath: string): Promise<string> => {
  try {
    console.log("Hit service-1");
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(filePath); // Remove file after upload
    console.log("Hit service-2");

    return result.secure_url;
  } catch (error) {
    throw new Error("Failed to upload file to Cloudinary");
  }
};

const fileUploaderServices = {
  uploadFileToCloudinary,
};

export default fileUploaderServices;
