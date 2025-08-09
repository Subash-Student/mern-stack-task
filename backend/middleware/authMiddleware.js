import jwt from "jsonwebtoken"
import User from "../model/Users.js";

// Middleware to protect routes (require authentication)
const protect = async (req, res, next) => {
    let token;

    // Check for Bearer token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token and decode payload
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user id to request object
            req.id = decoded.id;

            // Move to next middleware or route handler
            next();
        } catch (error) {
            // Token verification failed
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    // No token found
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export default protect;
