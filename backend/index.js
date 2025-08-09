// backend/server.mjs

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoutes.js';
import taskRouter from './routes/taskRouter.js';

dotenv.config(); // Load env variables

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request body
app.use(cors({
    origin:"",
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: '*',
    credentials: true,
}));        

// Routes
app.use('/api/users', userRouter); // User auth routes
app.use('/api/tasks', taskRouter); // Task CRUD routes

// Connect to DB
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
