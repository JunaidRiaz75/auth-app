import mongoose from "mongoose";

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    console.log("✅ Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "auth",
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("🔥 MongoDB Connection Error:", error);
    throw new Error("MongoDB connection failed");
  }
}
