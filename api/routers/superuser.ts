import { Router } from "express";
import { authMiddleware, isSuperUserMiddleware } from "../middlewares/auth";
import { requestBodyParse, requestQueryParse } from "../middlewares/request";
import UserModel from "../models/user";
import {
  GetUsersSchema,
  SuperuserCreateUserSchema,
  SuperuserUserResponseSchema,
  SuperuserUsersResponseSchema,
} from "../utils/schema";
import { z } from "zod";
import { responseSerializerMiddlerware } from "../middlewares/response";
const SuperuserRouter = Router();

SuperuserRouter.use(authMiddleware, isSuperUserMiddleware);

SuperuserRouter.get(
  "/users",
  requestQueryParse(GetUsersSchema),
  async (req, res, next) => {
    const { role } = req.parsedQuery as z.infer<typeof GetUsersSchema>;
    const users = await UserModel.find({ role });
    req.responseData = { users };
    next();
  },
  responseSerializerMiddlerware(
    SuperuserUsersResponseSchema,
    "Users fetched successfully"
  )
);

SuperuserRouter.post(
  "/user",
  requestBodyParse(SuperuserCreateUserSchema),
  async (req, res, next) => {
    const {
      name,
      email,
      password,
      isEmailVerified,
      role,
      emailVerificationCode,
    } = req.parsedBody as z.infer<typeof SuperuserCreateUserSchema>;
    const user = await UserModel.create({
      name,
      email,
      password,
      isEmailVerified,
      role,
      emailVerificationCode,
    });
    req.responseData = { user };
    next();
  },
  responseSerializerMiddlerware(
    SuperuserUserResponseSchema,
    "User created successfully"
  )
);

export default SuperuserRouter;
