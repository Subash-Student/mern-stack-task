import express from "express";
import protect from "../middleware/authMiddleware.js"; // Middleware to check token
import { createTask, deleteTask, getTasks, updateTask } from "../controller/taskController.js";

const taskRouter = express.Router();

// Routes for /tasks
taskRouter.route('/')
    .get(protect, getTasks)      // Get all tasks for logged-in user
    .post(protect, createTask);  // Create a new task

// Routes for /tasks/:id
taskRouter.route('/:id')
    .put(protect, updateTask)    // Update a task by ID
    .delete(protect, deleteTask);// Delete a task by ID

export default taskRouter;
