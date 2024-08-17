import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import limiter from "./middleware/limiter";
import fileUploaderRoute from "./routes/fileUploader.routes";
import envConfig from "./configs/envConfig";

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Root route handler
app.get("/", limiter(5), (req: Request, res: Response) => {
  res.send("Server is running...🏃");
});

// Routes
app.use("/api/v1/fileuploader", limiter(20), fileUploaderRoute);

// 404 Error handler for undefined routes
app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error("Requested URL was not found!");
  console.error("Requested URL:", req.url);
  next(err);
});

// General error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res
    .status(500)
    .json({ status: "fail", message: err.message || "Internal Server Error" });
});

const PORT = envConfig.port || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
