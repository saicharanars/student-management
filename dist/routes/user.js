"use strict";
// const express = require('express');
Object.defineProperty(exports, "__esModule", { value: true });
// const userController = require('../controllers/user');
const auth = require('../middleware/auth');
const express_1 = require("express");
const user_1 = require("../controllers/user");
// import swaggerDocument from 'swagger-ui-express';
const router = (0, express_1.Router)();
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
router.post("/signup", user_1.postsignup);
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
router.post("/login", user_1.postLogin);
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
router.post("/adduser", auth.authenticate, user_1.addUser);
// module.exports = router;
exports.default = router;
