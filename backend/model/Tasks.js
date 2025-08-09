import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    user_id:{ type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'pending',
    },
    dueDate: { type: Date },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;