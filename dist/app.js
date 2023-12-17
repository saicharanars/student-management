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
app.use(express_1.default.json());
app.use(user_1.default);
app.use(task_1.default);
mongoose_1.default
    .connect("mongodb+srv://saicharanars:724242726@cluster0.sexo9ar.mongodb.net/Student-Management-System?retryWrites=true&w=majority")
    .then((result) => {
    console.log("started");
    app.listen({ port: 4000 });
    (0, swagger_1.default)(app, 4000);
})
    .catch((err) => {
    console.log(err);
});
