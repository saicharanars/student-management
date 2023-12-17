"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const Schema = mongoose.Schema;
const mongoose_1 = require("mongoose");
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
const userSchema = new mongoose_1.Schema({
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
    type: {
        type: String,
        required: true,
    },
});
// module.exports = mongoose.model("User", userSchema);
exports.default = (0, mongoose_1.model)("User", userSchema);
