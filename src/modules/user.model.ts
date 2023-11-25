import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import {
  TOrders,
  TUser,
  TUserAddress,
  TUsername,
  UserModel,
} from "./user.interface";
import config from "../app/config";

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

const userSchema = new Schema<TUser, UserModel>({
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
userSchema.pre("save", async function (next) {
  // hashing password '

  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

userSchema.set("toJSON", {
  transform: function (doc, ret, opt) {
    delete ret.password; //
    return ret;
  },
});

userSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.statics.isUserExist = async function name(id: number) {
  const exsitingUser = await User.findOne({ userId: id });
  return exsitingUser;
};
userSchema.statics.ifUserExist = async function name(id: number) {
  const exsitingUser = await User.findOne({ userId: { $ne: id } });
  return exsitingUser;
};

// creating a collection in database
export const User = model<TUser, UserModel>("User", userSchema);
