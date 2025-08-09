import express from "express";
import { loginUser, registerUser } from "../controller/userController.js"; // User controller functions
import { validateLoginUser, validateRegisterUser } from "../middleware/validateMiddleware.js"; // Input validation

const userRouter = express.Router();

// Register new user
userRouter.post('/register', validateRegisterUser, registerUser);

// Login existing user
userRouter.post('/login', validateLoginUser, loginUser);

export default userRouter;
