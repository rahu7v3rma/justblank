import { expressConnect } from "./utils/express";
import { mongooseConnect } from "./utils/mongoose";

mongooseConnect();
expressConnect();
