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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.Users.isUserExists(userData.userId)) {
        throw new Error('User already exists!');
    }
    const result = yield user_model_1.Users.create(userData);
    return result;
});
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.Users.find({}, { username: 1, fullName: 1, email: 1, age: 1, address: 1 });
    return result;
});
const getSingleUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.Users.find({ userId: id });
    return result;
});
const deleteUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.Users.deleteOne({ userId: id });
    return result;
});
const updateUserFromDB = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.Users.updateOne({ userId: id }, { $set: updateData });
    return result;
});
const addOrderToDB = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.Users.updateOne({ userId: id }, { $push: { orders: updateData } });
    return result;
});
const getAllOrdersFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.Users.find({ userId: id }, { orders: 1 });
    return result;
});
const getOrdersPriceFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.Users.find({ userId: id }, { orders: 1 });
    // console.log('control',result[0].orders)
    return result[0].orders;
});
exports.UserServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    deleteUserFromDB,
    updateUserFromDB,
    addOrderToDB,
    getAllOrdersFromDB,
    getOrdersPriceFromDB,
};
