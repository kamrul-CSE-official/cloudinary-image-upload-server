import express from "express";
import multer from "multer";
import authenticate from "../middleware/authenticate";
import fileUploaderController from "../controllers/fileUploader.controllers";

const router = express.Router();

// Configure multer to handle file uploads, storing files temporarily in the 'uploads/' folder
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    console.log("Multer - File Filtering");
    // Allow only image files
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  },
});

// File upload route with authentication and single file handling
router.post(
  "/",
  authenticate, // Middleware to authenticate the user
  upload.single("file"), // Handle single file upload with field name 'file'
  async (req, res, next) => {
    try {
      await fileUploaderController.fileUploadController(req, res, next);
    } catch (error) {
      next(error); // Pass the error to the error handling middleware
    }
  }
);

export default router;
