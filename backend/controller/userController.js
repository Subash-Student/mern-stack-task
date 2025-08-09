import jwt from "jsonwebtoken"
import User from "../model/Users.js";

// Generate JWT token for authentication
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token valid for 30 days
    });
};

// Register a new user
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    // Check if email or username already exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
        return res.status(400).json({ success:false, message: 'User with that email or username already exists' });
    }

    // Create user in DB
    const user = await User.create({ username, email, password });
    if (user) {
        res.status(201).json({
            success:true,
            token: generateToken(user._id), // Send token to client
            message: 'Successfully Registered!'
        });
    } else {
        res.status(400).json({ success:false, message: 'Invalid user data' });
    }
};

// Login existing user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check password and return token
    if (user && (await user.matchPassword(password))) {
        res.json({
            success:true,
            token: generateToken(user._id),
            message: 'Successfully Loged In!'
        });
    } else {
        res.status(401).json({ success:false, message: 'Invalid email or password' });
    }
};
