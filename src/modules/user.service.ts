import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExist(userData.userId)) {
    throw new Error("User already exists");
  }
  const result = await User.create(userData);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async (id: number) => {
  const exsitingUser = await User.aggregate([{ $match: { userId: id } }]);
  return exsitingUser;
};

const updateSingleUser = async (id: number) => {
  const exsitingUser = await User.aggregate([
    {
      $match: {
        userId: id,
      },
    },
    {
      $group: {
        _id: null,
        orders: {
          $push: {
            productName: "string",
            price: "number",
            quantity: "number",
          },
        },
      },
    },
  ]);
  return exsitingUser;
};
const deleteSingleUser = async (id: number) => {
  const exsitingUser = await User.updateOne(
    { userId: id },
    { isDeleted: true }
  );
  return exsitingUser;
};

const getUserOrdersFromDB = async (id: number) => {
  const result = await User.aggregate([
    {
      $match: {
        userId: id,
      },
    },
    { $unset: ["_id", "orders._id"] },
    {
      $project: {
        orders: 1,
      },
    },
  ]);
  return result;
};

const getUserTotalPrice = async (id: number) => {
  const result = await User.aggregate([
    {
      $match: {
        userId: id,
      },
    },
    {
      $unwind: "$orders",
    },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ["$orders.price", "$orders.quantity"] },
        },
      },
    },
    {
      $unset: "_id",
    },
  ]);
  return result;
};
export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateSingleUser,
  deleteSingleUser,
  getUserOrdersFromDB,
  getUserTotalPrice,
};
