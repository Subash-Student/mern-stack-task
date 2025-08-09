import Task from "../model/Tasks.js";
import User from "../model/Users.js";



export const getTasks = async (req, res) => {
    try {
        const userId = req.id;
        const tasks = await Task.find({ user_id: userId });
        const user = await User.findById(userId);

        if (tasks && user) {
            return res.json({ tasks,user });
        }

        res.status(404).json({ message: 'No tasks found' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


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
        const createdTask = await newTask.save();
        res.status(201).json(createdTask);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;

    try {
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

    

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


export const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await Task.deleteOne({ _id: id });
        res.json({ message: 'Task removed' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
};

