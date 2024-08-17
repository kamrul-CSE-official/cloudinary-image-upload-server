"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_1 = __importDefault(require("cloudinary"));
const envConfig_1 = __importDefault(require("./envConfig"));
// Configure Cloudinary
cloudinary_1.default.v2.config({
    cloud_name: envConfig_1.default.cloudinary.cloudName,
    api_key: envConfig_1.default.cloudinary.apiKey,
    api_secret: envConfig_1.default.cloudinary.apiSecreat,
});
// Configure Cloudinary storage for multer
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.default.v2,
    params: {
        folder: "uploads", // Specify the folder in Cloudinary where files will be uploaded
        // Ensure this returns a valid format or string
        format: (req, file) => {
            // Return a string format directly; if you need dynamic behavior, ensure it's a valid format
            return "png"; // Or use logic to return different formats if needed
        },
        // Ensure this returns a string
        public_id: (req, file) => {
            // Return a string for public_id, ensure 'file' is used if needed or just return a string
            return `computed-filename-${Date.now()}`; // Example of a dynamic public ID
        },
        // Allowed formats should be a list of strings
        allowed_formats: ["jpg", "png", "jpeg"], // Specify the allowed file formats
    },
});
exports.default = storage;
