import Joi from "joi";

// Schema for user registration validation
const userSchema = Joi.object({
    // Added 'username' field with required and min length validation
    username: Joi.string().min(3).required().messages({
        'string.min': 'Username must be at least 3 characters long.',
        'any.required': 'Username is required.',
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.email': 'Please enter a valid email address.',
        'any.required': 'Email is required.',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long.',
        'any.required': 'Password is required.',
    }),
});

// Schema for task validation
const taskSchema = Joi.object({
    title: Joi.string().min(3).required().messages({
        'string.min': 'Title must be at least 3 characters long.',
        'any.required': 'Title is required.',
    }),
    description: Joi.string().allow('').optional(), // Description is optional
    status: Joi.string().valid('pending', 'in-progress', 'completed').optional().messages({
        'any.only': 'Status must be one of: pending, in-progress, completed.',
    }),
    dueDate: Joi.date().iso().optional().messages({
        'date.iso': 'Due date must be a valid ISO 8601 date.',
    }),
});

// Middleware function to validate user registration data
export const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

// Middleware function to validate task data
export const validateTask = (req, res, next) => {
    const { error } = taskSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};


