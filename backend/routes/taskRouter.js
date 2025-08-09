import express from "express";
import protect from "../middleware/authMiddleware.js";
import { createTask, deleteTask, getTasks, updateTask } from "../controller/taskController.js";


const taskRouter = express.Router();

taskRouter.route('/')
    .get(protect,getTasks )      
    .post(protect, createTask);  

taskRouter.route('/:id')
    .put(protect, updateTask)     
    .delete( deleteTask); 

export default taskRouter;