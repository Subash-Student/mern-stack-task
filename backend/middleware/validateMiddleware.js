import Joi from "joi";


const registerSchema = Joi.object({
   
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
const loginSchema = Joi.object({
   
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.email': 'Please enter a valid email address.',
        'any.required': 'Email is required.',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long.',
        'any.required': 'Password is required.',
    }),
});


const taskSchema = Joi.object({
    title: Joi.string().min(3).required().messages({
        'string.min': 'Title must be at least 3 characters long.',
        'any.required': 'Title is required.',
    }),
    description: Joi.string().allow('').optional(), 
    status: Joi.string().valid('pending', 'in-progress', 'completed').optional().messages({
        'any.only': 'Status must be one of: pending, in-progress, completed.',
    }),
    dueDate: Joi.date().iso().optional().messages({
        'date.iso': 'Due date must be a valid ISO 8601 date.',
    }),
});


export const validateRegisterUser = (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};
export const validateLoginUser = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};


export const validateTask = (req, res, next) => {
    const { error } = taskSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};


