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
const fileUploadController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        const fileUrl = yield fileUploader_service_1.default.uploadFileToCloudinary(req.file.path);
        return res.status(200).json({ fileUrl });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
const fileUploaderController = {
    fileUploadController,
};
exports.default = fileUploaderController;
