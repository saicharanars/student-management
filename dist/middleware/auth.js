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
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
// interface AuthenticatedRequest extends Request {
//     user?: User;
//   }
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    console.log(token);
    const user = yield jsonwebtoken_1.default.verify(token, "hgtyf1f51ge5ef555sb1f5");
    console.log(user, "ujhi");
    const project = yield user_1.default.findById(user.userid).exec();
    console.log(project);
    if (project) {
        req.user = project;
        console.log(req.user, "user from auth js");
        next();
    }
    else {
        console.log("Not found!");
        return res.status(401).json({ error: "Authentication failed" });
    }
});
exports.authenticate = authenticate;
