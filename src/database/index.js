import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI ?? "");

    console.log("MongoDB connection successful!");
  } catch (error) {
    console.log("Failed to connect to Database: ", error);
    process.exit(1);
  }
};