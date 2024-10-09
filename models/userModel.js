import mongoose from "mongoose";
const NewGrade = new mongoose.Schema({
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
const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: [true, "please add the full name"], unique: [true, "fullName already exists"], trim: true },
    passportId: { type: String, trim: true, required: [true, "please add your passportID"], length: [9, "please enter valid passportID"], match: [/^[A-Z]{2}[0-9]{7}$/, "passportId must be a 9 digit number"], unique: [true, "PassportID already exists"] },
    password: { type: String, required: [true, "please add the model name"], trim: true },
    grades: { type: [NewGrade] },
    role: { type: String, enum: ["student", "teacher"], default: "student" },
});
export default mongoose.model("User", UserSchema);
