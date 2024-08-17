import { unlinkSync } from "fs";
import cloudinary from "cloudinary";
import envConfig from "../configs/envConfig";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: envConfig.cloudinary.cloudName,
  api_key: envConfig.cloudinary.apiKey,
  api_secret: envConfig.cloudinary.apiSecreat,
});

const uploadFileToCloudinary = async (filePath: string): Promise<string> => {
  try {
    // Upload the file to Cloudinary
    const result = await cloudinary.v2.uploader.upload(filePath, {
      resource_type: "auto",
    });

    // Delete the local file after successful upload
    unlinkSync(filePath);

    // Return the secure URL of the uploaded file
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    throw new Error("Failed to upload file to Cloudinary");
  }
};

const fileUploaderServices = {
  uploadFileToCloudinary,
};

export default fileUploaderServices;
