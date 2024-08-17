"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const cloudinary_1 = __importDefault(require("cloudinary"));
const envConfig_1 = __importDefault(require("../configs/envConfig"));
// Configure Cloudinary
cloudinary_1.default.v2.config({
    cloud_name: envConfig_1.default.cloudinary.cloudName,
    api_key: envConfig_1.default.cloudinary.apiKey,
    api_secret: envConfig_1.default.cloudinary.apiSecreat,
});
const uploadFileToCloudinary = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Upload the file to Cloudinary
        const result = yield cloudinary_1.default.v2.uploader.upload(filePath, {
            resource_type: "auto",
        });
        // Delete the local file after successful upload
        (0, fs_1.unlinkSync)(filePath);
        // Return the secure URL of the uploaded file
        return result.secure_url;
    }
    catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        throw new Error("Failed to upload file to Cloudinary");
    }
});
const fileUploaderServices = {
    uploadFileToCloudinary,
};
exports.default = fileUploaderServices;
