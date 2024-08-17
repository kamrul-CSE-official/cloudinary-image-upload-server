"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const envConfig_1 = __importDefault(require("../configs/envConfig"));
const authenticate = (req, res, next) => {
    const apiKey = req.headers["x-api-key"];
    const validApiKey = envConfig_1.default.apiKey;
    if (apiKey && apiKey === validApiKey) {
        next();
    }
    else {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
exports.default = authenticate;
