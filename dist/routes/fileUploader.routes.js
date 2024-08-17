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
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const authenticate_1 = __importDefault(require("../middleware/authenticate"));
const fileUploader_controllers_1 = __importDefault(require("../controllers/fileUploader.controllers"));
const router = express_1.default.Router();
// Configure multer to handle file uploads, storing files temporarily in the 'uploads/' folder
const upload = (0, multer_1.default)({
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
router.post("/", authenticate_1.default, // Middleware to authenticate the user
upload.single("file"), // Handle single file upload with field name 'file'
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fileUploader_controllers_1.default.fileUploadController(req, res, next);
    }
    catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
}));
exports.default = router;
