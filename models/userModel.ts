import { Schema } from "mongoose";
import mongoose from "mongoose";

const NewGrade:Schema = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, "please add the subject"],
  },
  grade: {
    type: Number,
    required: [true, "please add the grade"],
    MAX: 100,
  },
});

const UserSchema:Schema = new mongoose.Schema({
  fullName: { type: String, required: [true, "please add the full name"], unique: [true, "fullName already exists"], trim: true } as object,
  passportId: { type: String, trim: true, required: [true, "please add your passportID"], length: [9, "please enter valid passportID"], match: [/^[A-Z]{2}[0-9]{7}$/, "passportId must be a 9 digit number"], unique: [true, "PassportID already exists"] } as object,
  password: { type: String, required: [true, "please add the model name"], trim: true} as object,
  grades: { type: [NewGrade] } as object,
  role: { type: String, enum: ["student", "teacher"], default: "student" } as object,
});

export interface User{
    fullName: string;
    password: string;
    passportId: string;
    grades?: Grade[];
    role: string;
    _id?:string;
}

export interface Grade {
    id?: string;
    subject: string;
    grade: number;
  }

export interface Average {
  name: string,
  grads?: Grade[],
  average?: number,
}

export default mongoose.model("User", UserSchema);
