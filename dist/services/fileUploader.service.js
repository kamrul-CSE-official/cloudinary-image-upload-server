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
const fs_1 = __importDefault(require("fs"));
const cloudinary_1 = require("cloudinary");
const envConfig_1 = __importDefault(require("../configs/envConfig"));
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: envConfig_1.default.cloudinary.cloudName,
    api_key: envConfig_1.default.cloudinary.apiKey,
    api_secret: envConfig_1.default.cloudinary.apiSecreat,
});
const uploadFileToCloudinary = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cloudinary_1.v2.uploader.upload(filePath, {
            resource_type: "auto",
        });
        fs_1.default.unlinkSync(filePath); // Remove file after upload
        return result.secure_url;
    }
    catch (error) {
        throw new Error("Failed to upload file to Cloudinary");
    }
});
const fileUploaderServices = {
    uploadFileToCloudinary,
};
exports.default = fileUploaderServices;
