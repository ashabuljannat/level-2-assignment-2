import Joi from 'joi';

const userFullNameSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .max(10)
    .regex(/^[A-Z][a-z]*$/, { name: 'capitalize' })
    .message('First Name must start with a capital letter'),
  lastName: Joi.string()
    .required()
    .trim()
    .max(10)
    .regex(/^[A-Z][a-z]*$/),
});

const userNameSchema = Joi.string()
  .required()
  .trim()
  .max(10)
  .message('Name must upto 10 letter');

const addressSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
});

export const userJoiValidationSchema = Joi.object({
  userId: Joi.number().required(),
  username: userNameSchema.required(),
  fullName: userFullNameSchema.required(),
  password: Joi.string().required().max(30),
  address: addressSchema.required(),
  email: Joi.string().email().required(),
  age: Joi.number().required(),
  orders: Joi.object(),
  hobbies: Joi.array().required(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default userJoiValidationSchema;
