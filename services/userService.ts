import Users, { User } from "../models/userModel.js";
import bcrypt from 'bcrypt';

export const registerUser = async (user: User): Promise<User | void> => {
  try {
    const passwordHash = await bcrypt.hash(user.password.toString(), 10);
    const newUser: User = {
      fullName: user.fullName,
      passportId: user.passportId,
      password: passwordHash,
      grades: [],
      role: user.role,
    };
    await Users.create(newUser);
    return newUser;
  } catch (error) {
    throw error;
  }
};

export const authenticateUser = async (fullName: string, password: string): Promise<User | null> => {
  const user: User | null = await Users.findOne({fullName: fullName})
  if (user && await bcrypt.compare(password.toString(), user.password)) {
    return user;
  }
  return null;
};
