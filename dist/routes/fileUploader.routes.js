"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const authenticate_1 = __importDefault(require("../middleware/authenticate"));
const fileUploader_controllers_1 = __importDefault(require("../controllers/fileUploader.controllers"));
const router = express_1.default.Router();
// Configure multer to handle file uploads in memory
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(), // Store files in memory
    limits: { fileSize: 80 * 1024 * 1024 }, // Limit file size to 80MB
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Only image files are allowed!"));
        }
        cb(null, true);
    },
});
// File upload route with authentication and single file handling
router.post("/", authenticate_1.default, upload.single("file"), (req, res, next) => {
    fileUploader_controllers_1.default.fileUploadController(req, res, next).catch(next);
});
exports.default = router;
