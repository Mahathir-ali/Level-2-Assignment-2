import { z } from "zod";

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, { message: "Firstname cannot be more than 20 Characters" })
    .refine((value) => value.charAt(0) === value.charAt(0).toUpperCase(), {
      message:
        "{Value} is not in correct format. First character must be in capital form",
    }),
  lastName: z
    .string()
    .trim()
    .max(20, { message: "Lastname cannot be more than 20 Characters" }),
});

const userAddressValidationSchema = z.object({
  street: z.string().trim(),
  city: z.string().trim(),
  country: z.string().trim(),
});

const orderValidationSchema = z.object({
  productName: z.string().trim(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

const userValidationSchema = z.object({
  userId: z.number().int().positive(),
  username: z.string().trim(),
  password: z.string().min(8).max(20),
  fullName: userNameValidationSchema,
  age: z.number().int().positive(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: userAddressValidationSchema,
  orders: z.array(orderValidationSchema),
  isDeleted: z.boolean(),
});

export default userValidationSchema;
