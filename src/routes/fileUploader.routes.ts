import express from "express";
import multer from "multer";
import authenticate from "../middleware/authenticate";
import fileUploaderController from "../controllers/fileUploader.controllers";

const router = express.Router();

// Configure multer to handle file uploads, storing files temporarily in the 'uploads/' folder
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    console.log("Multer");
    // Add custom file filtering logic if needed
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
  (req, res, next) => {
    fileUploaderController.fileUploadController(req, res, next).catch(next);
  }
);

export default router;
