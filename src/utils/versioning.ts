import { Request, Response, NextFunction } from "express";

export const versioning = (version: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.baseUrl.startsWith(`/api/v${version}`)) {
      req.baseUrl = req.baseUrl.replace(`/api/v${version}`, "");
      next();
    } else {
      res.status(404).json({ message: "API version not found" });
    }
  };
};