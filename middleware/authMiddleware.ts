import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Error } from "mongoose";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.token;
  if (!token) {
    res.status(401).json({ message: "Access token missing" });
    return;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

export const authIfTeacher = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.token;
  if (!token) {
    res.status(401).json({ message: "Access token missing" });
    return;
  }
  try {
    const decoded:any = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    if (decoded.role !== "teacher") {
      throw Error
    }
    next();
  } catch (error) {
    res.status(403).json({ message: "you do not have access to teacher space" });
  }
};

export const authIfStudent = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.token;
  if (!token) {
    res.status(401).json({ message: "Access token missing" });
    return;
  }
  try {
    const decoded:any = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    if (decoded.role !== "student") {
      throw Error
    }
    next();
  } catch (error) {
    res.status(403).json({ message: "you do not have access student space" });
  }
};
