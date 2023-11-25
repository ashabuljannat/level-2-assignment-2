"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userJoiValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const userFullNameSchema = joi_1.default.object({
    firstName: joi_1.default.string()
        .required()
        .trim()
        .max(10)
        .regex(/^[A-Z][a-z]*$/, { name: 'capitalize' })
        .message('First Name must start with a capital letter'),
    lastName: joi_1.default.string()
        .required()
        .trim()
        .max(10)
        .regex(/^[A-Z][a-z]*$/),
});
const userNameSchema = joi_1.default.string()
    .required()
    .trim()
    .max(10)
    .message('Name must upto 10 letter');
const addressSchema = joi_1.default.object({
    street: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    country: joi_1.default.string().required(),
});
exports.userJoiValidationSchema = joi_1.default.object({
    userId: joi_1.default.number().required(),
    username: userNameSchema.required(),
    fullName: userFullNameSchema.required(),
    password: joi_1.default.string().required().max(30),
    address: addressSchema.required(),
    email: joi_1.default.string().email().required(),
    age: joi_1.default.number().required(),
    orders: joi_1.default.object(),
    hobbies: joi_1.default.array().required(),
    isActive: joi_1.default.string().valid('active', 'blocked').default('active'),
});
exports.default = exports.userJoiValidationSchema;
