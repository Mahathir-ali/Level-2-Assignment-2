"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
// import { UserRoutes } from "./modules/user.route";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//application routes
// app.use("/api/users", UserRoutes);
app.get("/", (req, res) => {
    res.send("Hello From Hand Written server");
});
exports.default = app;
