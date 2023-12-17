"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
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
const taskSchema = new mongoose_1.Schema({
    task: {
        type: String,
        required: true,
    },
    duedate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});
// module.exports = mongoose.model("Task", taskSchema);
exports.default = (0, mongoose_1.model)("Task", taskSchema);
