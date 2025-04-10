import { model, Schema } from "mongoose";
import { User } from "../utils/types";

const UserSchema = new Schema<User>({
  name: String,
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  role: String,
  isEmailVerified: Boolean,
  emailVerificationCode: String,
});

const UserModel = model<User>("User", UserSchema);

export default UserModel;
