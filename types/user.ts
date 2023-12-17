import { Document } from "mongoose";
import { Request } from "express";
export interface User extends Document{
    name:string,
    email:string,
    department:string,
    password:string,
    type:string
}
export interface AuthenticatedRequest extends Request {
    user?: User;
  }