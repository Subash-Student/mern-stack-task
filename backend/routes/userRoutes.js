import express from "express";
import { loginUser, registerUser } from "../controller/userController.js";
import { validateLoginUser, validateRegisterUser } from "../middleware/validateMiddleware.js";


const userRouter = express.Router();

userRouter.post('/register',validateRegisterUser, registerUser);
userRouter.post('/login',validateLoginUser, loginUser);

export default userRouter;