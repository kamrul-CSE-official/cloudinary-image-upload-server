import { Request, Response, NextFunction } from "express";
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

    const fileUrl = await fileUploaderServices.uploadFileToCloudinary(
      req.file.path
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
