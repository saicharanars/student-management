// const User = require("../models/user");
// const path = require("path");
// import User from '../models/user';
import path from 'path';
const rootDir = path.dirname(__dirname);
import Taskmodel from "../models/task";
import { Response, Request,NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/user';
// const TaskModel = require("../models/task"); // Renamed the constant to avoid conflict

const addtask = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {
  try {
    const taskData = req.body; // Destructuring the entire req.body object
    console.log(req.user);
    if (req.user && req.user.type != "admin") {
      res.status(401).json({ data: "unauthorized access" });
    } else {
      const task = new Taskmodel({
        task: taskData.task,
        duedate: taskData.duedate,
        status: taskData.status,
        userId: taskData.userid
      });

      const addedTask = await task.save();
      res.status(200).json({ data: addedTask });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};
const getTasksbyuser = async(req:AuthenticatedRequest,res:Response,next:NextFunction) =>{
    try {
        console.log(req.user)
        if (req.user){

            const userid = req.user._id;
            const tasks = await Taskmodel.find({userId:userid});
            res.status(200).json({ data: tasks });
        }else{
            res.status(401).json({ message:"unauthorized" });
        }
        
    } catch (error) {
        console.log(error);
        
    }
}
const editTasksbyuser = async(req:AuthenticatedRequest,res:Response,next:NextFunction) =>{
    try {
        console.log(req.user,req.body)
        const body = req.body
        const taskid = req.params.taskid
        const tasks = await Taskmodel.findByIdAndUpdate(taskid,{status:body.status});
        console.log(tasks,"hfb")
        res.status(200).json({ data: "successful" });
        
    } catch (error) {
        console.log(error);
        
    }
}
export {addtask,getTasksbyuser,editTasksbyuser}
