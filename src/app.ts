import cors from "cors";
import express, { Application, Request, Response } from "express";
import { UserRoutes } from "./modules/user.route";
const app: Application = express();

app.use(express.json());
app.use(cors());

//application routes
app.use("/api/users", UserRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello From Hand Written server");
});

export default app;
