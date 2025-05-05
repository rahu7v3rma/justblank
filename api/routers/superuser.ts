import { Router } from "express";
import {
  authMiddleware,
  isSuperUserMiddleware,
  verifyParamUserMiddleware,
} from "../middlewares/auth";
import {
  requestBodyParse,
  requestParamsParse,
  requestQueryParse,
} from "../middlewares/request";
import UserModel from "../models/user";
import {
  EmptyResponseSchema,
  GetUsersSchema,
  SuperuserCreateUserSchema,
  SuperuserEditUserParamsSchema,
  SuperuserEditUserSchema,
  SuperuserUserResponseSchema,
  SuperuserUsersResponseSchema,
} from "../utils/schema";
import { z } from "zod";
import { responseSerializerMiddlerware } from "../middlewares/response";
import { sendEmail } from "../utils/email";
import { genEmailVerificationCode } from "../utils/number";
import { env } from "../utils/env";
import { hashPassword } from "../utils/bcrypt";

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
      sendVerificationEmail,
    } = req.parsedBody as z.infer<typeof SuperuserCreateUserSchema>;
    const user = await UserModel.create({
      name,
      email,
      password: await hashPassword(password),
      isEmailVerified,
      role,
    });
    if (sendVerificationEmail) {
      const emailVerificationCode = genEmailVerificationCode();
      user.emailVerificationCode = emailVerificationCode.toString();
      await user.save();
      sendEmail(
        email,
        `${env.WEBSITE_NAME} - Email verification code`,
        emailVerificationCode.toString()
      );
    }
    req.responseData = { user };
    next();
  },
  responseSerializerMiddlerware(
    SuperuserUserResponseSchema,
    "User created successfully"
  )
);

SuperuserRouter.put(
  "/user/:_id",
  requestParamsParse(SuperuserEditUserParamsSchema),
  requestBodyParse(SuperuserEditUserSchema),
  async (req, res, next) => {
    const {
      name,
      email,
      password,
      isEmailVerified,
      role,
      sendVerificationEmail,
    } = req.parsedBody as z.infer<typeof SuperuserEditUserSchema>;
    const { _id } = req.parsedPath as z.infer<
      typeof SuperuserEditUserParamsSchema
    >;
    const user = await UserModel.findById(_id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      });
      return;
    }
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await hashPassword(password);
    if (isEmailVerified !== undefined) user.isEmailVerified = isEmailVerified;
    if (role) user.role = role;
    await user.save();
    if (email && sendVerificationEmail) {
      const emailVerificationCode = genEmailVerificationCode();
      user.emailVerificationCode = emailVerificationCode.toString();
      await user.save();
      sendEmail(
        email,
        `${env.WEBSITE_NAME} - Email verification code`,
        emailVerificationCode.toString()
      );
    }
    req.responseData = { user };
    next();
  },
  responseSerializerMiddlerware(
    SuperuserUserResponseSchema,
    "User edited successfully"
  )
);

SuperuserRouter.delete(
  "/user/:_id",
  requestParamsParse(SuperuserEditUserParamsSchema),
  verifyParamUserMiddleware,
  async (req, res, next) => {
    const user = req.paramUser;
    await user.deleteOne();
    req.responseData = {};
    next();
  },
  responseSerializerMiddlerware(
    EmptyResponseSchema,
    "User deleted successfully"
  )
);

export default SuperuserRouter;
