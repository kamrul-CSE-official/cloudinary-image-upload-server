import { Request, Response, NextFunction } from "express";
import sharp from "sharp";
import fileUploaderServices from "../services/fileUploader.service";

const fileUploadController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: "fail",
        message: "No file uploaded",
      });
    }

    // Resize and compress the image using sharp
    const resizedImageBuffer = await sharp(req.file.buffer)
      .resize(800, 800, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFormat("jpeg", { quality: 60 })
      .toBuffer();

    // Upload the processed image to Cloudinary
    const fileUrl = await fileUploaderServices.uploadFileToCloudinary(
      resizedImageBuffer,
      req.file.mimetype
    );

    return res.status(200).json({
      status: "success",
      fileUrl,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      status: "fail",
      message: error.message || "Internal Server Error",
    });
  }
};

const fileUploaderController = {
  fileUploadController,
};

export default fileUploaderController;
