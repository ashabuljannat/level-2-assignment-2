import { User } from './user.interface';
import { Users } from './user.model';

const createUserIntoDB = async (userData: User) => {
  //   if (await Student.isUserExists(studentData.id)) {
  //     throw new Error('User already exists!');
  //   }
  const result = await Users.create(userData);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await Users.find(
    {},
    { username: 1, fullName: 1, email: 1, age: 1, address: 1 },
  );
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await Users.find({ userId: id });
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await Users.deleteOne({ userId: id });
  return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars, @typescript-eslint/no-unused-vars
const updateUserFromDB = async (id: string, updateData: User) => {
  const result = await Users.updateOne(
    { userId: id },
    { isActive: 'inactive' },
  );
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserFromDB,
};
