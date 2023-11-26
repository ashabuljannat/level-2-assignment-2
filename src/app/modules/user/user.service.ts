/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */ // console.log(result); console.log(11, result);
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

const updateUserFromDB = async (id: any, updateData: any) => {
  if (!Users.isUserNotExists(id)) {
    throw new Error('User not found');
  }
  const result = await Users.updateOne(
    { userId: id },
    { isActive: 'inactive' },
  );

  if (result.matchedCount === 1) {
    if (result.modifiedCount === 1) {
      return 'update';
    } else return '';
  } else return 'userNot';
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

const getOrdersPriceFromDB = async (id: any) => {
  if (!Users.isUserNotExists(id)) {
    throw new Error('User not found');
  }
  const result = await Users.findOne({ userId: id }, { orders: 1 });

  if (result === null) {
    return null;
  } else  return result.orders;
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
