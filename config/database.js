const mongoose = require("mongoose");

URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://uday:uday@notestaking.0kmdo.mongodb.net/?retryWrites=true&w=majority&appName=NotesTaking";

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
