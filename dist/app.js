"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const user_1 = __importDefault(require("./routes/user"));
const task_1 = __importDefault(require("./routes/task"));
const swagger_1 = __importDefault(require("./utils/swagger"));
require("dotenv/config");
app.use(express_1.default.json());
app.use(user_1.default);
app.use(task_1.default);
if (process.env.DB_URL && process.env.PORT) {
    console.log(process.env);
    const portal = process.env.PORT;
    const db_url = process.env.DB_URL;
    mongoose_1.default
        .connect(db_url)
        .then((result) => {
        console.log("Database connection established");
        app.listen({ port: portal });
        (0, swagger_1.default)(app, +portal);
    })
        .catch((err) => {
        console.log("Error connecting to the database:", err);
    });
}
