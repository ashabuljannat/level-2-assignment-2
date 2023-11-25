import { z } from 'zod';

const userFullNameSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z][a-z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  lastName: z
    .string()
    .trim()
    .max(10)
    .regex(/^[A-Z][a-z]*$/),
});

const userNameSchema = z
  .string()
  .trim()
  .max(10, { message: 'user Name must upto 10 letter and lowercase letters' })
  .regex(/^[a-z]*$/);

const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

export const userJoiValidationSchema = z.object({
  userId: z.number(),
  username: userNameSchema,
  fullName: userFullNameSchema.required(),
  password: z.string().max(30),
  address: addressSchema.required(),
  email: z.string().email(),
  age: z.number(),
  orders: z.any(),
  hobbies: z.any(),
  isActive: z.enum(['active', 'blocked']).default('active'),
});

export default userJoiValidationSchema;
