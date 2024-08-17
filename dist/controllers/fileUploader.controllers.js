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
const fileUploader_service_1 = __importDefault(require("../services/fileUploader.service"));
const fileUploadController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({
                status: "fail",
                message: "No file uploaded",
            });
        }
        // Convert file buffer to a readable stream
        const fileBuffer = req.file.buffer;
        const fileMimeType = req.file.mimetype;
        const fileUrl = yield fileUploader_service_1.default.uploadFileToCloudinary(fileBuffer, fileMimeType);
        return res.status(200).json({
            status: "success",
            fileUrl,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "fail",
            message: error.message || "Internal Server Error",
        });
    }
});
const fileUploaderController = {
    fileUploadController,
};
exports.default = fileUploaderController;
