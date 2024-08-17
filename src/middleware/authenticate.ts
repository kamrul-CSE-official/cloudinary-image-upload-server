import { NextFunction, Request, Response } from "express";
import envConfig from "../configs/envConfig";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers["x-api-key"];
  const validApiKey = envConfig.apiKey;

  if (apiKey && validApiKey && apiKey === validApiKey) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default authenticate;
