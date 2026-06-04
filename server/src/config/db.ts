import mongoose from "mongoose";
import { config } from "dotenv";

config();

export const connectDB = async (): Promise<void> => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`Database connected successfully: ${connection.connection.host}`);
    } catch (error) {
        console.error("Database connection failed!!");
        console.error(error);

        process.exit(1);
    }
}
