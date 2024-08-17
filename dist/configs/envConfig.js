"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envConfig = {
    port: parseInt(process.env.PORT || "5000", 10),
    dbUrl: process.env.DB_URL,
    refreshTokenSecret: process.env.refresh_token_secret,
    refreshTokenExpiresIn: process.env.refresh_token_expiresIn,
    accessTokenSecret: process.env.access_token_secret,
    accessTokenExpiresIn: process.env.access_token_expireIn,
    bcrypt: process.env.BCRYPT_SALT_ROUNDS,
    nodeEnv: process.env.NODE_ENV,
    apiKey: process.env.API_KEY,
    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecreat: process.env.CLOUDINARY_API_SECRET,
        apiURL: process.env.CLOUDINARY_URL,
    },
};
exports.default = envConfig;
