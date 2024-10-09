import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Error } from "mongoose";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
export const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    if (!token) {
        res.status(401).json({ message: "Access token missing" });
        return;
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
};
export const authIfTeacher = (req, res, next) => {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    if (!token) {
        res.status(401).json({ message: "Access token missing" });
        return;
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        if (decoded.role == "teacher") {
            throw Error;
        }
        next();
    }
    catch (error) {
        res.status(403).json({ message: "you do not have access to teacher space" });
    }
};
export const authIfStudent = (req, res, next) => {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    if (!token) {
        res.status(401).json({ message: "Access token missing" });
        return;
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        if (decoded.role == "student") {
            throw Error;
        }
        next();
    }
    catch (error) {
        res.status(403).json({ message: "you do not have access student space" });
    }
};
