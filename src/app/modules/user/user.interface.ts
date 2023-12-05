/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type UserFullName = {
  firstName: string;
  lastName: string;
};

export type Address = {
  street: string;
  city: string;
  country: string;
};

export type Order = {
  productName: string;
  price: number;
  quantity: number;
};

export type User = {
  userId: number;
  username: string;
  password: string;
  fullName: UserFullName;
  age: number;
  email: string;
  isActive: 'active' | 'inactive';
  address: Address;
  hobbies: string[];
  orders: Order[];
};

export interface UserModel extends Model<User> {
  isUserExistsById(userId: number): Promise<User | null>;
  isUserExistsByUsername(username: string): Promise<User | null>;
  isUserNotExists(userId: number): Promise<User | null>;
}
