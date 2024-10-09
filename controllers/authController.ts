import { Request, Response } from "express";
import Users, { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { authenticateUser, registerUser } from "../services/userService.js";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET || "default_secret";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: User = req.body;
    if (!user.fullName || !user.password) {
      res.status(400).json({ error: "Username and password are required." });
      return;
    }
    const newUser = await registerUser(user);
    console.log(newUser)
    res.status(201).json({ massage: "User is register", newUser: newUser });
  } catch (error: any) {
    if (error.message === "Username already exists.") {
      res.status(409).json({ error: error.message });
    } else {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, password } = req.body;
    if (!fullName || !password) {
      res.status(400).json({ error: "Username and password are required." });
      return;
    }

    const user: User | null = await authenticateUser(fullName, password);
    if (user) {
      const token = jwt.sign({ id : user._id, role : user.role},JWT_SECRET,{ expiresIn: "1h" });
      res.cookie('token', token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 3600000, 
        sameSite: 'strict',
      });
      res.json({ token });
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error: any) {
    if (error.message === "Invalid username or password.") {
      res.status(401).json({ error: error.message });
    } else {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
};
