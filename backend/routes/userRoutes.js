import express from "express";
import { loginUser, registerUser } from "../controller/userController.js";
import { validateUser } from "../middleware/validateMiddleware.js";


const userRouter = express.Router();

userRouter.post('/register',validateUser, registerUser);
userRouter.post('/login',validateUser, loginUser);

export default userRouter;