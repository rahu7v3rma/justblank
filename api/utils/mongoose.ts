import mongoose from "mongoose";
import { env } from "./env";

export const mongooseConnect = () => {
  mongoose.connect(env.MONGODB_URI!).then(() => {
    console.log("Connected to MongoDB");
  });
};
