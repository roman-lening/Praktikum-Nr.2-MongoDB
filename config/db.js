import mongoose from "mongoose";

const dbURI = process.env.MONGO_URI;

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
  } catch (err) {
    console.error("Failed connecting to MongoDB:", err);
  }
};

export default connectDB;