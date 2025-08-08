// backend/server.mjs
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoutes.js';
dotenv.config();


connectDB()

const app = express();
app.use(express.json()); // Body parser middleware
app.use(cors());

app.use('/api/users', userRouter);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));