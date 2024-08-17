"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const envConfig_1 = __importDefault(require("../configs/envConfig"));
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: envConfig_1.default.cloudinary.cloudName,
    api_key: envConfig_1.default.cloudinary.apiKey,
    api_secret: envConfig_1.default.cloudinary.apiSecreat,
});
const uploadFileToCloudinary = (fileBuffer, fileMimeType) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.v2.uploader.upload_stream({ resource_type: "auto", format: fileMimeType.split("/")[1] }, // Automatically determine file format
        (error, result) => {
            if (error) {
                return reject(error);
            }
            if (result) {
                return resolve(result.secure_url);
            }
            reject(new Error("Upload failed"));
        });
        stream.end(fileBuffer);
    });
};
const fileUploaderServices = {
    uploadFileToCloudinary,
};
exports.default = fileUploaderServices;
