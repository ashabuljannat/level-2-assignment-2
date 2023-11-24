"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
// import bcrypt from 'bcrypt';
const mongoose_1 = require("mongoose");
const userFullNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
        trim: true,
        maxlength: [10, 'Name can not be more than 10 characters'],
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Last Name is required'],
        maxlength: [10, 'Name can not be more than 10 characters'],
    },
});
const addressSchema = new mongoose_1.Schema({
    street: {
        type: String,
        required: [true, 'City street Name is required'],
    },
    city: {
        type: String,
        required: [true, 'Country city Name is required'],
    },
    country: {
        type: String,
        required: [true, 'Country Name is required'],
    },
});
const orderSchema = new mongoose_1.Schema({
    productName: {
        type: String,
        required: [true, 'Product Name is required'],
    },
    price: {
        type: Number,
        required: [true, 'CProduct price is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Product quantity is required'],
    },
});
const userSchema = new mongoose_1.Schema({
    userId: { type: Number, required: [true, 'ID is required'], unique: true },
    username: {
        type: String,
        required: [true, 'UserName is required'],
        maxlength: [10, 'username can not be more than 10 characters'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        maxlength: [20, 'Password can not be more than 20 characters'],
    },
    fullName: {
        type: userFullNameSchema,
        required: [true, 'Full Name is required'],
    },
    address: {
        type: addressSchema,
        required: [true, 'Address is required'],
    },
    orders: {
        type: [orderSchema],
    },
    hobbies: {
        type: [String],
        required: [true, 'Hobby is required'],
    },
    age: { type: Number, required: [true, 'age is required'] },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    isActive: {
        type: String,
        enum: {
            values: ['active', 'inactive'],
            message: '{VALUE} is not a valid status',
        },
        default: 'active',
    },
});
exports.Users = (0, mongoose_1.model)('user', userSchema);
