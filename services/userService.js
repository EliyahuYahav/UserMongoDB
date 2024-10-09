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
import bcrypt from 'bcrypt';
export const registerUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passwordHash = yield bcrypt.hash(user.password.toString(), 10);
        const newUser = {
            fullName: user.fullName,
            passportId: user.passportId,
            password: passwordHash,
            grades: [],
            role: user.role,
        };
        yield Users.create(newUser);
        return newUser;
    }
    catch (error) {
        throw error;
    }
});
export const authenticateUser = (fullName, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Users.findOne({ fullName: fullName });
    if (user && (yield bcrypt.compare(password.toString(), user.password))) {
        return user;
    }
    return null;
});
