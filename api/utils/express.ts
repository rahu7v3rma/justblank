import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import UserRouter from "../routers/user";
import { env } from "./env";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(morgan("dev"));

app.use("/user", UserRouter);

app.get("/connect", async (req, res) => {
  res.send({
    success: true,
    message: "API connected",
    data: null,
  });
});

export const expressConnect = () => {
  app.listen(env.PORT, () => {
    console.log(`Express server is running on port ${env.PORT}`);
  });
};
