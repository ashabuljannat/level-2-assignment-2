/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order } from './user.interface';
import { Users } from './user.model';

const createUserIntoDB = async (userData: any) => {
  if (await Users.isUserExists(userData.userId)) {
    throw new Error('User already exists!');
  }
  const result: any = await Users.create(userData);
  const { password, _id, __v, ...userDataWithoutPassword } = result._doc;

  return userDataWithoutPassword;
};

const getAllUsersFromDB = async () => {
  const result = await Users.find(
    {},
    { username: 1, fullName: 1, email: 1, age: 1, address: 1 },
    // if (!user) {
    //   console.log('User not found');
    //   return;
    // }
  );
  // ).select('-password');
  return result;
};

const getSingleUserFromDB = async (id: any) => {
  if (!Users.isUserNotExists(id)) {
    throw new Error('User not found');
  }
  const result = await Users.findOne({ userId: id });
  return result;
};

const deleteUserFromDB = async (id: any) => {
  if (!Users.isUserNotExists(id)) {
    throw new Error('User not found');
  }
  const result = await Users.deleteOne({ userId: id });
  return result;
};

const updateUserFromDB = async (id: string, updateData: any) => {
  const result = await Users.updateOne(
    { userId: id },
    { isActive: 'inactive' },
  );
  return result;
};

const addOrderToDB = async (id: string, updateData: Order) => {
  const result = await Users.updateOne(
    { userId: id },
    // { $set: { orders: updateData } },
    { $push: { orders: updateData } },
  );
  
  if (result.modifiedCount === 1) {
    return result;
  } else return null;
};

const getAllOrdersFromDB = async (id: any) => {
  if (!Users.isUserNotExists(id)) {
    throw new Error('User not found');
  }
  const result = await Users.findOne({ userId: id }, { orders: 1 });

  if (result) {
    return result;
  } else return null;
};

const getOrdersPriceFromDB = async (id: string) => {
  const result = await Users.findOne({ userId: id }, { orders: 1 });

  if (result) {
    return result.orders;
  } else return null;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserFromDB,
  addOrderToDB,
  getAllOrdersFromDB,
  getOrdersPriceFromDB,
};
