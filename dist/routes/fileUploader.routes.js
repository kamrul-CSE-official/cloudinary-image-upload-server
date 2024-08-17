"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const fileUploader_controllers_1 = __importDefault(require("../controllers/fileUploader.controllers"));
const authenticate_1 = __importDefault(require("../middleware/authenticate"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: "uploads/" }); // Save files temporarily to 'uploads/' folder
router.post("/", authenticate_1.default, upload.single("file"), fileUploader_controllers_1.default.fileUploadController);
exports.default = router;
