import Users, { User } from "../models/userModel.js";

const file = './users.json';

export const getUsers = async (): Promise<User[]> => {
  return await Users.find();
};

export const insertUsers = async (users: User[]): Promise<void> => {
  await Users.insertMany(users);
};
