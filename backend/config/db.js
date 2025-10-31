import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (retryCount = 0) => {
    const MAX_RETRIES = 5;
    const RETRY_DELAY = 5000; // 5 seconds

    try {
        const dbURI = process.env.MONGODB_URI;

        if (!dbURI) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }

        // Modern Mongoose connection options (v6+)
        const options = {
            serverSelectionTimeoutMS: 10000, // Timeout after 10 seconds 
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            maxPoolSize: 10, // Maintain up to 10 socket connections
            minPoolSize: 2, // Maintain at least 2 socket connections
            connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
            family: 4, // Use IPv4, skip trying IPv6
        };

        await mongoose.connect(dbURI, options);

        console.log("✅ MongoDB connected successfully!");
        console.log(`📊 Database: ${mongoose.connection.name}`);
        console.log(`🌐 Host: ${mongoose.connection.host}`);

        // Connection event listeners
        mongoose.connection.on("disconnected", () => {
            console.warn("⚠️  MongoDB disconnected. Attempting to reconnect...");
        });

        mongoose.connection.on("reconnected", () => {
            console.log("✅ MongoDB reconnected!");
        });

        mongoose.connection.on("error", (err) => {
            console.error("❌ MongoDB connection error:", err.message);
        });

    } catch (error) {
        console.error(`❌ Error connecting to MongoDB (Attempt ${retryCount + 1}/${MAX_RETRIES}):`, error.message);

        if (retryCount < MAX_RETRIES) {
            console.log(`⏳ Retrying in ${RETRY_DELAY / 1000} seconds...`);
            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
            return connectDB(retryCount + 1);
        } else {
            console.error("❌ Maximum retry attempts reached. Exiting...");
            console.error("\n💡 Troubleshooting tips:");
            console.error("1. Check your internet connection");
            console.error("2. Verify MONGODB_URI in .env file");
            console.error("3. Check if MongoDB Atlas IP whitelist includes your IP (or use 0.0.0.0/0 for all IPs)");
            console.error("4. Verify your MongoDB Atlas cluster is running");
            console.error("5. Check if your MongoDB credentials are correct\n");
            process.exit(1);
        }
    }
};

// Handle graceful shutdown
process.on("SIGINT", async () => {
    try {
        await mongoose.connection.close();
        console.log("\n✅ MongoDB connection closed through app termination");
        process.exit(0);
    } catch (err) {
        console.error("Error closing MongoDB connection:", err);
        process.exit(1);
    }
});

export default connectDB;