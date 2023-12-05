"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userJoiValidationSchema = void 0;
const zod_1 = require("zod");
const userFullNameSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .trim()
        .min(1)
        .max(20)
        .refine((value) => /^[A-Z][a-z]/.test(value), {
        message: 'First Name must start with a capital letter',
    }),
    lastName: zod_1.z
        .string()
        .trim()
        .max(10)
        .regex(/^[A-Z][a-z]*$/),
});
const userNameSchema = zod_1.z
    .string()
    .trim()
    .max(10, { message: 'user Name must upto 10 letter and lowercase letters' });
const addressSchema = zod_1.z.object({
    street: zod_1.z.string(),
    city: zod_1.z.string(),
    country: zod_1.z.string(),
});
exports.userJoiValidationSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: userNameSchema,
    fullName: userFullNameSchema.required(),
    password: zod_1.z.string().max(30),
    address: addressSchema.required(),
    email: zod_1.z.string().email(),
    age: zod_1.z.number(),
    orders: zod_1.z.any(),
    hobbies: zod_1.z.any(),
    isActive: zod_1.z.enum(['active', 'blocked']).default('active'),
});
exports.default = exports.userJoiValidationSchema;
