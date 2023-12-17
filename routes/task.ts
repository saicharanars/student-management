// const express = require('express');
import {addtask,getTasksbyuser,editTasksbyuser} from '../controllers/task';
// const taskController = require('../controllers/task');
const auth=require('../middleware/auth');

import { Router } from "express";

const router = Router();
/**
 * @openapi
 * /addtask:
 *   post:
 *     tags:
 *       - addtask
 *     description: add task by admin
 *     parameters:
 *       - in: query
 *         name: task
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: duedate
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: userid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/taskinput"
 *     responses:
 *       200:
 *         description: task added sucessfully
 *       401:
 *         description: Unauthorized acess
 */
router.post("/addtask",auth.authenticate,addtask);
/**
 * @openapi
 * /gettasksbyuser:
 *   get:
 *     tags:
 *       - addtask
 *     description: add task by admin
 *     parameters:
 *       - in: header
 *         name: jwt
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/taskinput"
 *     responses:
 *       200:
 *         description: get tasks of users
 *       401:
 *         description: Unauthorized access
 */
router.get("/gettasksbyuser",auth.authenticate,getTasksbyuser);
/**
 * @openapi
 * /edittaskbyuser/{taskid}:
 *   post:
 *     tags:
 *       - edittask
 *     description: edit task
 *     parameters:
 *       - in: query
 *         name: task
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: duedate
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: userid
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: taskid
 *         required: true
 *         description: userid to assign task
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/taskinput"
 *     responses:
 *       200:
 *         description: edited successfully
 */
router.post("/edittaskbyuser/:taskid",auth.authenticate,editTasksbyuser)


// module.exports = router;
export default router