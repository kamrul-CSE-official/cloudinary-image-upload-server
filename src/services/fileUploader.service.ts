import { v2 as cloudinary } from "cloudinary";
import envConfig from "../configs/envConfig";

// Configure Cloudinary
cloudinary.config({
  cloud_name: envConfig.cloudinary.cloudName,
  api_key: envConfig.cloudinary.apiKey,
  api_secret: envConfig.cloudinary.apiSecreat,
});

const uploadFileToCloudinary = (
  fileBuffer: Buffer,
  fileMimeType: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto", format: fileMimeType.split("/")[1] }, // Automatically determine file format
      (error, result) => {
        if (error) {
          return reject(error);
        }
        if (result) {
          return resolve(result.secure_url);
        }
        reject(new Error("Upload failed"));
      }
    );

    stream.end(fileBuffer);
  });
};

const fileUploaderServices = {
  uploadFileToCloudinary,
};

export default fileUploaderServices;
