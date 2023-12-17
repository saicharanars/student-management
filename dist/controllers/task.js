"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editTasksbyuser = exports.getTasksbyuser = exports.addtask = void 0;
// const User = require("../models/user");
// const path = require("path");
// import User from '../models/user';
const path_1 = __importDefault(require("path"));
const rootDir = path_1.default.dirname(__dirname);
const task_1 = __importDefault(require("../models/task"));
// const TaskModel = require("../models/task"); // Renamed the constant to avoid conflict
const addtask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskData = req.body; // Destructuring the entire req.body object
        console.log(req.user);
        if (req.user && req.user.type != "admin") {
            res.status(401).json({ data: "unauthorized access" });
        }
        else {
            const task = new task_1.default({
                task: taskData.task,
                duedate: taskData.duedate,
                status: taskData.status,
                userId: taskData.userid
            });
            const addedTask = yield task.save();
            res.status(200).json({ data: addedTask });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: error,
        });
    }
});
exports.addtask = addtask;
const getTasksbyuser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.user);
        if (req.user) {
            const userid = req.user._id;
            const tasks = yield task_1.default.find({ userId: userid });
            res.status(200).json({ data: tasks });
        }
        else {
            res.status(401).json({ message: "unauthorized" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getTasksbyuser = getTasksbyuser;
const editTasksbyuser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.user, req.body);
        const body = req.body;
        const taskid = req.params.taskid;
        const tasks = yield task_1.default.findByIdAndUpdate(taskid, { status: body.status });
        console.log(tasks, "hfb");
        res.status(200).json({ data: "successful" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.editTasksbyuser = editTasksbyuser;
