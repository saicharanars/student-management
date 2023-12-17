// const mongoose = require("mongoose");
import mongoose from "mongoose";
// const Schema = mongoose.Schema;
import { User } from "../types/user";
import {model,Schema} from 'mongoose';
import { Task } from "../types/task";

/**
 * @openapi
 * components:
 *   schemas:
 *     taskinput:
 *       type: object
 *       required:
 *         - task
 *         - duedate
 *         - status
 *         - userId
 *       properties:
 *         task:
 *           type: string
 *           default: start a project
 *         duedate:
 *           type: string
 *           default: "2023-12-23"
 *         status:
 *           type: string
 *           default: pending
 *         userId:
 *           type: string
 *           default: somerandomid
 */

const taskSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  duedate: {
    type: Date,
    required: true,
  },
  status:{
    type: String,
    required: true,

  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

// module.exports = mongoose.model("Task", taskSchema);
export default model<Task>("Task", taskSchema);