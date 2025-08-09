import jwt from "jsonwebtoken"
import User from "../model/Users.js";


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};


export const registerUser = async (req, res) => {
 ng
    const { username, email, password } = req.body;


    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
        return res.status(400).json({success:false, message: 'User with that email or username already exists' });
    }


    const user = await User.create({ username, email, password });
    if (user) {
        res.status(201).json({
            success:true,
            token: generateToken(user._id),
            message: 'Successfully Registered!'
        });
    } else {
        res.status(400).json({success:false, message: 'Invalid user data' });
    }
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            success:true,
            token: generateToken(user._id),
            message: 'Successfully Loged In!'
        });
    } else {
        res.status(401).json({ success:false,message: 'Invalid email or password' });
    }
};

