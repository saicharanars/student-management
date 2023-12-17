import { Document } from "mongoose";
export interface Task extends Document{
    task:string,
    duedate:string,
    status:string,
    userId:string
}