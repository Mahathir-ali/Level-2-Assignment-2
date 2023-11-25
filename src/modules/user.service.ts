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
  // if (await User.ifUserExist(userData.userId)) {
  //   throw new Error("User already exists");
  // }
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
export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateSingleUser,
};
