"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const limiter_1 = __importDefault(require("./middleware/limiter"));
const fileUploader_routes_1 = __importDefault(require("./routes/fileUploader.routes"));
const envConfig_1 = __importDefault(require("./configs/envConfig"));
const app = (0, express_1.default)();
// Middleware setup
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Root route handler
app.get("/", (0, limiter_1.default)(5), (req, res) => {
    res.send("Server is running...🏃");
});
// Handle favicon.ico request to avoid errors
app.get("/favicon.ico", (req, res) => res.status(204));
// Routes
app.use("/api/v1/fileuploader", (0, limiter_1.default)(20), fileUploader_routes_1.default);
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        status: "fail",
        message: error.message || "Internal Server Error",
    });
});
// 404 Error handler for undefined routes
app.use((req, res, next) => {
    const err = new Error("Requested URL was not found!");
    console.error("Requested URL:", req.url);
    next(err);
});
// General error handler
app.use((err, req, res, next) => {
    res
        .status(500)
        .json({ status: "fail", message: err.message || "Internal Server Error" });
});
const PORT = envConfig_1.default.port || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
