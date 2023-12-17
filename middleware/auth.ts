import jwt from "jsonwebtoken";
import { Response, Request,NextFunction } from 'express';
// import user from "../models/user";
import { User } from "../types/user";
import { AuthenticatedRequest } from "../types/user";


import usermodel from "../models/user";
// interface AuthenticatedRequest extends Request {
//     user?: User;
//   }
export const authenticate = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {
  const token:any = req.headers.authorization;
  console.log(token)
  const user:any = await jwt.verify(token, "hgtyf1f51ge5ef555sb1f5");
  console.log(user,"ujhi")
  const project:User | null = await usermodel.findById(user.userid).exec();
  console.log(project)
  if (project) {
    
    req.user = project;
    
    console.log(req.user, "user from auth js");
    next();
  } else {
    console.log("Not found!");
    return res.status(401).json({ error: "Authentication failed" });
  }
};