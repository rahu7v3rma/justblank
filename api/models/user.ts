import { model, Schema } from "mongoose";
import { User } from "../utils/types";

const UserSchema = new Schema<User>(
  {
    name: String,
    email: String,
    password: String,
    role: String,
    isEmailVerified: Boolean,
    emailVerificationCode: String,
  },
  {
    timestamps: true,
  }
);

const UserModel = model<User>("User", UserSchema);

export default UserModel;
