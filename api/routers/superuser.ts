import { Router } from "express";
import { authMiddleware, isSuperUserMiddleware } from "../middlewares/auth";
import { requestQueryParse } from "../middlewares/request";
import UserModel from "../models/user";
import { GetUsersSchema, SuperuserUsersResponseSchema } from "../utils/schema";
import { z } from "zod";
import { responseSerializerMiddlerware } from "../middlewares/response";
const SuperuserRouter = Router();

SuperuserRouter.use(authMiddleware, isSuperUserMiddleware);

SuperuserRouter.get(
  "/users",
  requestQueryParse(GetUsersSchema),
  async (req, res, next) => {
    const { role } = req.parsedQuery as z.infer<typeof GetUsersSchema>;
    const users = await UserModel.find({ role }).select("name email role");
    req.responseData = { users };
    next();
  },
  responseSerializerMiddlerware(
    SuperuserUsersResponseSchema,
    "Users fetched successfully"
  )
);

export default SuperuserRouter;
