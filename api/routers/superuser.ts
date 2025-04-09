import { Router } from "express";
import { isSuperUserMiddleware } from "../middlewares/auth";

const SuperuserRouter = Router();

SuperuserRouter.use(isSuperUserMiddleware);

// SuperUserRouter.post("/create-user", async (req, res) => {

// });

export default SuperuserRouter;
