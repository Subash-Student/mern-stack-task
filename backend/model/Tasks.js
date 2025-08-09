import mongoose from "mongoose";

// Define Task schema structure
const taskSchema = new mongoose.Schema({
    // ID of the user who created the task
    user_id: { type: String, required: true },

    // Task title (mandatory)
    title: { type: String, required: true },

    // Optional task description
    description: { type: String },

    // Task status with predefined values
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'], // Allowed values
        default: 'pending', // Default status
    },

    // Optional due date for the task
    dueDate: { type: Date },
}, 
// Automatically add createdAt & updatedAt timestamps
{ timestamps: true }
);

// Create Task model from schema
const Task = mongoose.model('Task', taskSchema);

export default Task;
