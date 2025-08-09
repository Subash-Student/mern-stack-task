import jwt from "jsonwebtoken"
import User from "../model/Users.js";

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res) => {
    // Added 'username' to the request body destructuring
    const { username, email, password } = req.body;

    // Check for existing user by email or username
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
        return res.status(400).json({success:false, message: 'User with that email or username already exists' });
    }

    // Create a new user with the username
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

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
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

