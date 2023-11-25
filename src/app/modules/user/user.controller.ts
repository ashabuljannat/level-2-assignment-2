/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userJoiValidationSchema from './user.validation.zod';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const zodParsedData = userJoiValidationSchema.parse(user);

    const result = await UserServices.createUserIntoDB(zodParsedData);
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: error.message || 'something went wrong',
    //     message2: error.message || 'something went wrong',
    //     error: error.details,
    //   });
    // }

    res.status(200).json({
      success: true,
      message: 'User is created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      // message2: err.message || 'something went wrong',
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

    if (result) {
      res.status(200).json({
        success: true,
        message: `User id ${userId} fetched successfully!`,
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: `User id ${userId} not found`,
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
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

    if (result.deletedCount === 0) {
      res.status(500).json({
        success: false,
        message: `User id ${userId} not found`,
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: `User id ${userId} deleted successfully!`,
        data: { deletedCount: result.deletedCount },
      });
    }
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
    const { orders } = req.body;
    const result = await UserServices.updateUserFromDB(userId, orders);

    res.status(200).json({
      success: true,
      message: `User id ${userId} updated successfully!`,
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

    if (result === null) {
      res.status(500).json({
        success: false,
        message: `User id ${userId} not found`,
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: `Order created successfully for User id ${userId} fetched successfully!`,
        data: { modifiedCount: result.modifiedCount },
      });
    }
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

    if (result === null) {
      res.status(500).json({
        success: false,
        message: `User id ${userId} not found`,
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: `Order of User id ${userId} fetched successfully!`,
        data: result,
      });
    }
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
    const totalCost = calculateTotalCost(result);

    if (result === null) {
      res.status(500).json({
        success: false,
        message: `User id ${userId} not found`,
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: `Total price calculated successfully of Order User id ${userId}`,
        data: { totalPrice: totalCost },
      });
    }
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
