"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersControllers = void 0;
const user_service_1 = require("./user.service");
const user_validation_zod_1 = __importDefault(require("./user.validation.zod"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req.body;
        const zodParsedData = user_validation_zod_1.default.parse(user);
        const result = yield user_service_1.UserServices.createUserIntoDB(zodParsedData);
        res.status(200).json({
            success: true,
            message: 'User is created successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserServices.getAllUsersFromDB();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserServices.getSingleUserFromDB(userId);
        if (result) {
            res.status(200).json({
                success: true,
                message: `User id ${userId} fetched successfully!`,
                data: result,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: `User id ${userId} not found`,
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserServices.deleteUserFromDB(userId);
        if (result.deletedCount === 0) {
            res.status(500).json({
                success: false,
                message: `User id ${userId} not found`,
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: `User id ${userId} deleted successfully!`,
                data: { deletedCount: result.deletedCount },
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { orders } = req.body;
        const result = yield user_service_1.UserServices.updateUserFromDB(userId, orders);
        if (result === 'userNot') {
            res.status(500).json({
                success: false,
                message: `User id ${userId} not found`,
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        else {
            if (result === 'update') {
                res.status(200).json({
                    success: true,
                    message: `User id ${userId} updated successfully!`,
                    data: { modifiedCount: 1 },
                });
            }
            else {
                res.status(200).json({
                    success: false,
                    message: `you enter same data to User id ${userId}`,
                    data: { modifiedCount: 0 },
                });
            }
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
const addNewOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { orders } = req.body;
        const result = yield user_service_1.UserServices.addOrderToDB(userId, orders);
        if (result === null) {
            res.status(500).json({
                success: false,
                message: `User id ${userId} not found`,
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: `Order created successfully for User id ${userId}`,
                data: { modifiedCount: result.modifiedCount },
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserServices.getAllOrdersFromDB(userId);
        if (result === null) {
            res.status(500).json({
                success: false,
                message: `User id ${userId} not found`,
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: `Order of User id ${userId} fetched successfully!`,
                data: result,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
function calculateTotalCost(cart) {
    return cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
}
const getAllOrdersPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserServices.getOrdersPriceFromDB(userId);
        if (result === null) {
            res.status(500).json({
                success: false,
                message: `User id ${userId} not found`,
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        else {
            const totalCost = calculateTotalCost(result);
            res.status(200).json({
                success: true,
                message: `Total price calculated successfully of Order User id ${userId}`,
                data: { totalPrice: totalCost },
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
exports.UsersControllers = {
    createUser,
    getAllUsers,
    getSingleUser,
    deleteUser,
    updateUser,
    addNewOrder,
    getAllOrders,
    getAllOrdersPrice,
};
