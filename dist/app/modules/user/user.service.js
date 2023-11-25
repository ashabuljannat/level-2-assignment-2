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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.Users.isUserExists(userData.userId)) {
        throw new Error('User already exists!');
    }
    const result = yield user_model_1.Users.create(userData);
    const _a = result._doc, { password, _id, __v } = _a, userDataWithoutPassword = __rest(_a, ["password", "_id", "__v"]);
    return userDataWithoutPassword;
});
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.Users.find({}, { username: 1, fullName: 1, email: 1, age: 1, address: 1 });
    // ).select('-password');
    return result;
});
const getSingleUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user_model_1.Users.isUserNotExists(id)) {
        throw new Error('User not found');
    }
    const result = yield user_model_1.Users.findOne({ userId: id });
    return result;
});
const deleteUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user_model_1.Users.isUserNotExists(id)) {
        throw new Error('User not found');
    }
    const result = yield user_model_1.Users.deleteOne({ userId: id });
    return result;
});
const updateUserFromDB = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.Users.updateOne({ userId: id }, { isActive: 'inactive' });
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
