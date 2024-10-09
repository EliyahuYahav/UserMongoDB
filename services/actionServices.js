var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Users from "../models/userModel.js";
export const AllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield Users.find();
    if (allUsers) {
        return allUsers;
    }
    else
        throw Error;
});
export const allGradsUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield Users.find();
    const allGrads = [];
    if (allUsers) {
        allUsers.forEach(user => {
            const userGrads = {
                name: user.fullName,
                grads: user.grades
            };
            allGrads.push(userGrads);
        });
        return allGrads;
    }
    else
        throw Error;
});
export const allGradsAverageUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield Users.find();
    const allGrads = [];
    if (allUsers) {
        allUsers.forEach(user => {
            const userGrads = {
                name: user.fullName,
                average: GetAverageUser(user)
            };
            allGrads.push(userGrads);
        });
        return allGrads;
    }
    else
        throw Error;
});
export const AddGradToStudent = (id, grad) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const student = yield Users.findOne({ _id: id });
    if (student) {
        (_a = student.grades) === null || _a === void 0 ? void 0 : _a.push(grad);
    }
    else
        throw Error;
});
export const RemoveGradStudent = (id, subject) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield Users.findByIdAndUpdate(id, { $pull: { grads: { subject: subject } } }, { new: true });
    if (student) {
        return student;
    }
    else
        throw Error;
});
export const EditGradStudent = (id, grad) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield Users.findByIdAndUpdate({ _id: id, "grads.subject": grad.subject }, { $set: { grads: grad } }, { new: true });
    if (student) {
        return student;
    }
    else
        throw Error;
});
export const findUserGrade = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield Users.findOne({ _id: id });
    if (student === null || student === void 0 ? void 0 : student.grades) {
        return student.grades;
    }
    else
        throw Error;
});
export const findUserAverageGrade = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield Users.findOne({ _id: id });
    if (student) {
        const userGrads = {
            name: student.fullName,
            average: GetAverageUser(student)
        };
        return userGrads;
    }
    else
        throw Error;
});
export const RemoveStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield Users.findByIdAndDelete(id, { role: { $ne: 'teacher' } });
    if (student) {
        return student;
    }
    else
        throw Error;
});
const GetAverageUser = (user) => {
    if (user.grades) {
        let sum = 0;
        user.grades.forEach(grad => {
            sum += grad.grade;
        });
        return sum / user.grades.length;
    }
    else
        throw Error;
};
