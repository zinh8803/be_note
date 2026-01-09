import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://localhost:27017/blog";

export const connectDB = async (): Promise<void> => {
  let retries = 5;

  while (retries) {
    try {
      await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 30000,
        connectTimeoutMS: 30000,
        socketTimeoutMS: 30000,
        family: 4,
      });
      console.log("MongoDB connected successfully");
      return;
    } catch (error: any) {
      console.error(
        `MongoDB connection attempt failed (${6 - retries}/5):`,
        error.message
      );
      retries -= 1;
      if (retries === 0) {
        console.error("Failed to connect to MongoDB after multiple attempts");
        process.exit(1);
      }
      console.log(`Retrying in 5 seconds... (${retries} attempts remaining)`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
};
      
