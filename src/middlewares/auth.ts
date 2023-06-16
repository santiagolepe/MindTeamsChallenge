import { Request, Response, NextFunction } from "express";
import { IUserAuthRequest } from '../utils/interfaces'
import jwt from "jsonwebtoken";

export const authMiddleware = (req: IUserAuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; role: string };
    req.userId = payload.userId;
    req.role = payload.role;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const requireRole = (...roles: string[]) => {
  return (req: IUserAuthRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.role!)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
