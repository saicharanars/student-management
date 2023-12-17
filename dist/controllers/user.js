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
exports.addUser = exports.postsignup = exports.postLogin = void 0;
const user_1 = __importDefault(require("../models/user"));
const path_1 = __importDefault(require("path"));
const rootDir = path_1.default.dirname(__dirname);
const bcrypt = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const postsignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const Username = req.body.username;
        const Email = req.body.email;
        const Department = req.body.department;
        const Password = req.body.password;
        const Type = req.body.type;
        const find = yield user_1.default.findOne({ email: Email });
        if (find) {
            console.log(find);
            console.log("email already exists");
            res.status(200).json({ users: "email already used", emailexist: find }); // This will certainly be 'Technical Lead JavaScript'
        }
        else {
            const hashedPassword = yield bcrypt.hash(Password, 10);
            const user = new user_1.default({
                name: Username,
                email: Email,
                department: Department,
                password: hashedPassword,
                type: Type,
            });
            const created = yield user.save();
            console.log(created);
            res.status(200).json({ users: user, emailexist: created });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: error,
        });
    }
});
exports.postsignup = postsignup;
const postLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Email = req.body.email;
        const Password = req.body.password;
        console.log(req.body);
        const emailfind = yield user_1.default.findOne({ email: Email });
        if (emailfind) {
            const userId = emailfind._id;
            function jwtToken() {
                return jsonwebtoken_1.default.sign({
                    userid: userId,
                }, "hgtyf1f51ge5ef555sb1f5");
            }
            const resp = yield bcrypt.compare(Password, emailfind.password);
            if (resp) {
                res
                    .status(200)
                    .json({ login: resp, data: emailfind, token: jwtToken() });
            }
            else {
                res.status(401).json({ login: "check your password" });
            }
        }
        else {
            res.status(404).json({ users: "email not exits please signup" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: error,
        });
    }
});
exports.postLogin = postLogin;
const addUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user && req.user.type != "admin") {
            res.status(401).json({ data: "unauthorized access" });
        }
        else {
            const userData = req.body;
            const find = yield user_1.default.findOne({ email: userData.email });
            if (find) {
                console.log(find);
                console.log("email already exists");
                res.status(200).json({ users: "email already used", emailexist: find }); // This will certainly be 'Technical Lead JavaScript'
            }
            else {
                const hashedPassword = yield bcrypt.hash(userData.password, 10);
                const adduser = new user_1.default({
                    name: userData.username,
                    email: userData.email,
                    password: hashedPassword,
                    type: userData.type,
                });
                const created = yield adduser.save();
                console.log(created);
                res.status(200).json({ users: adduser, emailexist: created });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: error,
        });
    }
});
exports.addUser = addUser;
