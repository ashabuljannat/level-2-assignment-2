/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userJoiValidationSchema from './user.validation.joi';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const { error, value: joiParsedData } =
      userJoiValidationSchema.validate(user);

    console.log(11, error, joiParsedData);

    const result = await UserServices.createUserIntoDB(joiParsedData);
    if (error) {
      res.status(500).json({
        success: false,
        message: error.message || 'something went wrong',
        error: error.details,
      });
    }

    res.status(200).json({
      success: true,
      message: 'User is created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.deleteUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: { deletedCount: result.deletedCount },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { updateData } = req.body;
    const result = await UserServices.updateUserFromDB(userId, updateData);

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const addNewOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { orders } = req.body;
    const result = await UserServices.addOrderToDB(userId, orders);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: { modifiedCount: result.modifiedCount },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getAllOrdersFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

function calculateTotalCost(cart: any) {
  return cart.reduce(
    (acc: any, product: any) => acc + product.price * product.quantity,
    0,
  );
}
const getAllOrdersPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getOrdersPriceFromDB(userId);
    // console.log('control', result);
    const totalCost = calculateTotalCost(result);

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: { totalPrice: totalCost },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

export const UsersControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
  addNewOrder,
  getAllOrders,
  getAllOrdersPrice,
};
