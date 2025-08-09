import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

// Function to connect MongoDB database
export const connectDB = async () => {
    try {
        // Connect to MongoDB using URI from .env file
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected`);
    } catch (error) {
        // If connection fails, log error and stop the server
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
