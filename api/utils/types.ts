import { Document } from "mongoose";
import { Request } from "express";

export interface User extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRequest extends Request {
  user: User;
}

export interface Geotarget extends Document {
  criteriaId: string;
  name: string;
  canonicalName: string;
  targetType: string;
  countryCode: string;
  createdAt: Date;
  updatedAt: Date;
}
