import express from "express";
import multer from "multer";
import authenticate from "../middleware/authenticate";
import fileUploaderController from "../controllers/fileUploader.controllers";

const router = express.Router();

// Configure multer to handle file uploads in memory
const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  },
});

// File upload route with authentication and single file handling
router.post(
  "/",
  authenticate,
  upload.single("file"),
  (req, res, next) => {
    fileUploaderController.fileUploadController(req, res, next).catch(next);
  }
);

export default router;
