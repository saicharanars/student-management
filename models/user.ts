import mongoose from "mongoose";
import { User } from "../types/user";
// const Schema = mongoose.Schema;
import {model,Schema} from 'mongoose';

/**
 * @openapi
 * components:
 *   schemas:
 *     userinput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - department
 *         - password
 *         - type
 *       properties:
 *         name:
 *           type: string
 *           default: charan
 *         email:
 *           type: string
 *           default: sa@hf.com
 *         department:
 *           type: string
 *           default: cse
 *         password:
 *           type: string
 *           default: mypassword
 *         type:
 *           type: string
 *           default: student
 */


const userSchema = new Schema({
  
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  department: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  type:{
    type: String,
    required:true,
  },
  
});

// module.exports = mongoose.model("User", userSchema);
export default model<User>("User",userSchema)