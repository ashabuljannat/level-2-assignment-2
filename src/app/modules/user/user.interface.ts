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
  // eslint-disable-next-line no-unused-vars
  isUserExists(userId: number): Promise<User | null>;
}
