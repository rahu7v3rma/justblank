import { NextFunction, RequestHandler, Response } from "express";
import UserModel from "../models/user";
import { verifyToken } from "../utils/jwt";
import { UserRequest } from "../utils/types";

export const authMiddleware: RequestHandler = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    res
      .status(401)
      .json({ success: false, message: "Unauthorized", data: null });
    return;
  }
  const decodedToken = verifyToken(token);
  if (!decodedToken) {
    res
      .status(401)
      .json({ success: false, message: "Unauthorized", data: null });
    return;
  }
  const user = await UserModel.findById(decodedToken);
  if (!user) {
    res
      .status(401)
      .json({ success: false, message: "Unauthorized", data: null });
    return;
  }
  if (!user.isEmailVerified) {
    res
      .status(401)
      .json({ success: false, message: "Unauthorized", data: null });
    return;
  }
  req.user = user;
  next();
};

export const isSuperUserMiddleware: RequestHandler = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user.role !== "superuser") {
    res.status(403).json({ success: false, message: "Forbidden", data: null });
    return;
  }
  next();
};
