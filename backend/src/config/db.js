// Mongoose does connection management, works with MongoDB
import mongoose from "mongoose"

// Takes 0 inputs, async allows you to use await
export const connectDB = async () => {
    try {
        // mongoose.connect inititated a connection with the MongoDB database
        // process.env.MONGO_URI is an environoment variable representing the database URL
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB CONNECTED SUCCESSFULLY!");
    // Here, you can name error anything you want to name it
    } catch (error) {
        console.error("Error connecting to MONGODB", error);
        process.exit(1); // exit with failure
    }
}
