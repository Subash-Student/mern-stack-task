import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

// Define User schema structure
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Unique username
    email: { type: String, required: true, unique: true },    // Unique email
    password: { type: String, required: true },               // Hashed password
}, 
// Adds createdAt & updatedAt automatically
{ timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next(); // Skip if password is unchanged
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); // Store hashed password
});

// Compare entered password with stored hash
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Create User model
const User = mongoose.model('User', userSchema);

export default User;
