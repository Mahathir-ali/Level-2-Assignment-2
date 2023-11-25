import { Schema, model } from "mongoose";
import { TOrders, TUser, TUserAddress, TUsername } from "./user.interface";
const userNameSchema = new Schema<TUsername>({
  firstName: {
    type: String,
    required: true,
    maxlength: [20, "Firstname cannot be more than 20 Characters"],
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: [20, "Firstname cannot be more than 20 Characters"],
    trim: true,
  },
});

const UserAddressSchema = new Schema<TUserAddress>({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const ordersSchema = new Schema<TOrders>({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },

  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: userNameSchema,
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    uniqe: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },

  hobbies: [
    {
      type: String,
    },
  ],
  address: UserAddressSchema,
  orders: [ordersSchema],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// creating a collection in database
export const User = model<TUser>("User", userSchema);
