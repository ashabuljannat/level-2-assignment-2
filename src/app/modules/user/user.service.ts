/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order } from './user.interface';
import { Users } from './user.model';


const createUserIntoDB = async (userData: any) => {
    if (await Users.isUserExists(userData.userId)) {
      throw new Error('User already exists!');
    }
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



const updateUserFromDB = async (id: string, updateData: any) => {
  const result = await Users.updateOne(
    { userId: id },
    { $set: updateData }
  );
  return result;
};

const addOrderToDB = async (id: string, updateData: Order) => {
  const result = await Users.updateOne(
    { userId: id },
    { $push: { orders: updateData } },
    // $set: { orders: [] },
  );
  return result;
};

const getAllOrdersFromDB = async (id: string) => {
  const result = await Users.find({ userId: id }, { orders: 1 });
  return result;
};

const getOrdersPriceFromDB = async (id: string) => {
  const result = await Users.find({ userId: id }, { orders: 1 });

  // console.log('control',result[0].orders)
  return result[0].orders;
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
