import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/", UserController.createUser);
router.get("/", UserController.getAllUser);
router.get("/:userId", UserController.getSingleUser);
router.put("/:userId", UserController.updateUser);
router.delete("/:userId", UserController.deleteUser);
router.get("/:userId/orders", UserController.userOrders);
router.get("/:userId/orders/total-price", UserController.totalPrice);

export const UserRoutes = router;
