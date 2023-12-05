import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import {
  Address,
  Order,
  User,
  UserFullName,
  UserModel,
} from './user.interface';

const userFullNameSchema = new Schema<UserFullName>({
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

const addressSchema = new Schema<Address>({
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

const orderSchema = new Schema<Order>({
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

const userSchema = new Schema<User, UserModel>({
  userId: { type: Number, required: [true, 'ID is required'], unique: true },

  username: {
    type: String,
    unique: true,
    required: [true, 'UserName is required'],
    maxlength: [10, 'username can not be more than 10 characters'],
  },

  password: {
    type: String,
    required: [true, 'Password is required'],
    maxlength: [20, 'Password can not be more than 20 characters'],
    select: false,
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

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

//creating a custom static method
userSchema.statics.isUserExistsById = async function (id: number) {
  const existingUser = await Users.findOne({ userId: id });
  return existingUser;
};

userSchema.statics.isUserExistsByUsername = async function (name: string) {
  const existingUser = await Users.findOne({ username: name }); 
  return existingUser;
};

userSchema.statics.isUserNotExists = async function (id: number) {
  const notExistingUser = await Users.findOne({ userId: id });
  return notExistingUser;
};

export const Users = model<User, UserModel>('user', userSchema);
