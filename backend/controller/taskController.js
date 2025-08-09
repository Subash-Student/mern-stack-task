import Task from "../model/Tasks.js";
import User from "../model/Users.js";

// Get all tasks of logged-in user
export const getTasks = async (req, res) => {
    try {
        const userId = req.id; // Get user ID from token
        const tasks = await Task.find({ user_id: userId }); // Find tasks by user
        const user = await User.findById(userId); // Find user details

        if (tasks && user) {
            return res.json({ tasks, user });
        }

        res.status(404).json({ message: 'No tasks found' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new task
export const createTask = async (req, res) => {
    const { title, description, status, dueDate } = req.body;
    const userId = req.id;
    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    try {
        const newTask = new Task({
            user_id: userId,
            title,
            description,
            status,
            dueDate,
        });
        const createdTask = await newTask.save(); // Save task to DB
        res.status(201).json(createdTask);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
};

// Update task by ID
export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;

    try {
        const task = await Task.findById(id); // Find task

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Update only provided fields
        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        task.dueDate = dueDate || task.dueDate;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete task by ID
export const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findById(id); // Find task

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await Task.deleteOne({ _id: id }); // Delete from DB
        res.json({ message: 'Task removed' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
};
