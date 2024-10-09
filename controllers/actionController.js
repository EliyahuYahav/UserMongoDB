var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AddGradToStudent, allGradsAverageUsers, allGradsUsers, AllUsers, EditGradStudent, findUserAverageGrade, findUserGrade, RemoveGradStudent, RemoveStudent } from "../services/actionServices.js";
export const GetAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield AllUsers();
        res.status(200).json({ data: allUsers, success: true });
    }
    catch (error) {
        res.status(400).json({ message: "you have a problem to get all users" });
    }
});
export const GetAllUsersGrads = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allGrads = yield allGradsUsers();
        res.status(200).json({ data: allGrads, success: true });
    }
    catch (error) {
        res.status(400).json({ message: "you have a problem to get all grads of users" });
    }
});
export const GetAllUsersAverageGrads = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allGrads = yield allGradsAverageUsers();
        res.status(200).json({ data: allGrads, success: true });
    }
    catch (error) {
        res.status(400).json({ message: "you have a problem to get all average grads of users" });
    }
});
export const AddGrad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield AddGradToStudent(req.params.id, req.body);
        res.status(200).json({ massage: "you add the grade" });
    }
    catch (error) {
        res.status(400).json({ message: "you have a problem to add grad to this user" });
    }
});
export const RemoveGrad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subject = req.body.subject;
        const student = yield RemoveGradStudent(req.params.id, subject);
        res.status(200).json({ student: student, massage: "you remove the grade" });
    }
    catch (error) {
        res.status(400).json({ message: "you have a problem to delete grad from this user" });
    }
});
export const EditGrad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield EditGradStudent(req.params.id, req.body);
        res.status(200).json({ student: student, massage: "you edit the grade" });
    }
    catch (error) {
        res.status(400).json({ message: "you have a problem to edit the grad to this user" });
    }
});
export const GetUserGradById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const User = yield findUserGrade(req.params.id);
        res.status(200).json({ data: User, success: true });
    }
    catch (error) {
        res.status(400).json({ message: "you have a problem to get the User" });
    }
});
export const GetUserAverageGradById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const User = yield findUserAverageGrade(req.params.id);
        res.status(200).json({ data: User, success: true });
    }
    catch (error) {
        res.status(400).json({ message: "you have a problem to get the User" });
    }
});
export const RemoveUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield RemoveStudent(req.params.id);
        res.status(200).json({ student: student, massage: "you delete your account" });
    }
    catch (error) {
        res.status(400).json({ message: "you have a problem to delete this user" });
    }
});
