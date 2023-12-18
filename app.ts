import express from 'express'
import mongoose from 'mongoose';
const app = express();
import userRoutes from "./routes/user";
import taskRoutes from "./routes/task";
import swaggerDocs from "./utils/swagger"
import 'dotenv/config';
app.use(express.json())

app.use(userRoutes);
app.use(taskRoutes)
if (process.env.DB_URL && process.env.PORT) {
    console.log(process.env)
    const portal = process.env.PORT;
    const db_url = process.env.DB_URL
    mongoose
        .connect(db_url)
        .then((result: any) => {
            console.log("Database connection established");
            app.listen({ port: portal });
            swaggerDocs(app, +portal);
        })
        .catch((err: string) => {
            console.log("Error connecting to the database:", err);
        });
}
