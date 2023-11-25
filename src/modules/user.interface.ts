export type TUsername = {
  firstName: string;
  lastName: string;
};

export type TUserAddress = {
  street: string;
  city: string;
  country: string;
};

export type TOrders = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TUsername;
  age: number;
  email: string;
  isActive: boolean;

  hobbies: string[];
  address: TUserAddress;
  orders: TOrders[];
  isDeleted: boolean;
};