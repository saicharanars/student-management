import express from 'express'
import mongoose from 'mongoose';
const app = express();
import userRoutes from "./routes/user";
import taskRoutes from "./routes/task";
import swaggerDocs from "./utils/swagger"
app.use(express.json())

app.use(userRoutes);
app.use(taskRoutes)
mongoose
  .connect(
    "mongodb+srv://saicharanars:724242726@cluster0.sexo9ar.mongodb.net/Student-Management-System?retryWrites=true&w=majority"
  )
  .then((result:any) => {
    console.log("started")
    
    app.listen({port:4000});
    swaggerDocs(app,4000)
  })
  .catch((err:string) => {
    console.log(err);
  });