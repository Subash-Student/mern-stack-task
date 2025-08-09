import express from "express";
import protect from "../middleware/authMiddleware.js";
import { createTask, deleteTask, getTasks, updateTask } from "../controller/taskController.js";


const taskRouter = express.Router();

taskRouter.route('/')
    .get(protect,getTasks )       // Protected route to get all tasks
    .post(protect, createTask);  // Protected route to create a new task

taskRouter.route('/:id')
    .put(protect, updateTask)     // Protected route to update a task
    .delete(protect, deleteTask); // Protected route to delete a task

export default taskRouter;