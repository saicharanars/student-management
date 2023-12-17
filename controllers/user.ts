import { User } from "../types/user";
import UserModel from "../models/user";
import { Response, Request, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/user";
import path from "path";
const rootDir = path.dirname(__dirname);
const bcrypt = require("bcryptjs");
import jwt from "jsonwebtoken";
const postsignup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body);
    const Username = req.body.username;
    const Email = req.body.email;
    const Department = req.body.department;
    const Password = req.body.password;
    const Type = req.body.type;
    const find = await UserModel.findOne({ email: Email });
    if (find) {
      console.log(find);
      console.log("email already exists");
      res.status(200).json({ users: "email already used", emailexist: find }); // This will certainly be 'Technical Lead JavaScript'
    } else {
      const hashedPassword = await bcrypt.hash(Password, 10);
      const user = new UserModel({
        name: Username,
        email: Email,
        department: Department,
        password: hashedPassword,
        type: Type,
      });
      const created = await user.save();
      console.log(created);

      res.status(200).json({ users: user, emailexist: created });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};
const postLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Email = req.body.email;
    const Password = req.body.password;
    console.log(req.body);
    const emailfind: User | null = await UserModel.findOne({ email: Email });

    if (emailfind) {
      const userId = emailfind._id;
      function jwtToken() {
        return jwt.sign(
          {
            userid: userId,
          },
          "hgtyf1f51ge5ef555sb1f5"
        );
      }
      const resp = await bcrypt.compare(Password, emailfind.password);

      if (resp) {
        res
          .status(200)
          .json({ login: resp, data: emailfind, token: jwtToken() });
      } else {
        res.status(401).json({ login: "check your password" });
      }
    } else {
      res.status(404).json({ users: "email not exits please signup" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};
const addUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user && req.user.type != "admin") {
      res.status(401).json({ data: "unauthorized access" });
    } else {
      const userData = req.body;
      const find = await UserModel.findOne({ email: userData.email });
      if (find) {
        console.log(find);
        console.log("email already exists");
        res.status(200).json({ users: "email already used", emailexist: find }); // This will certainly be 'Technical Lead JavaScript'
      } else {
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const adduser = new UserModel({
          name: userData.username,
          email: userData.email,
          password: hashedPassword,
          type: userData.type,
        });
        const created = await adduser.save();
        console.log(created);

        res.status(200).json({ users: adduser, emailexist: created });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};
export { postLogin, postsignup, addUser };
