// const express = require('express');

// const userController = require('../controllers/user');
const auth=require('../middleware/auth');
import { Router } from "express";
import {postsignup,postLogin,addUser} from "../controllers/user"
// import swaggerDocument from 'swagger-ui-express';





const router = Router();


/**
 * @openapi
 * /signup:
 *   post:
 *     tags:
 *       - signup
 *     description: responds with user signup
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *       - in: query
 *         name: password
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/userinput"
 *     responses:
 *       200:
 *         description: User signed up successfully
 */



router.post("/signup",postsignup);
/**
 * @openapi
 * /login:
 *   post:
 *     tags:
 *       - login
 *     description: responds with user login
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: password
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/userinput"
 *     responses:
 *       200:
 *         description: User loggedin  successfully
 */
router.post("/login",postLogin);
/**
 * @openapi
 * /adduser:
 *   post:
 *     tags:
 *       - adduser
 *     description: admin can add user
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *       - in: query
 *         name: password
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/userinput"
 *     responses:
 *       200:
 *         description: User added successfully
 */

router.post("/adduser",auth.authenticate,addUser)



// module.exports = router;
export default router