import { connectDB } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/userModel"; // Import the User model

export async function POST(req: Request) {
  try {
    await connectDB(); // Ensure MongoDB is connected

    // Read raw request body
    const bodyText = await req.text();
    console.log("🔹 Raw Request Body:", bodyText);

    // Parse JSON
    let body;
    try {
      body = JSON.parse(bodyText);
    } catch (error) {
      console.error("❌ JSON Parse Error:", error);
      return NextResponse.json(
        { error: "Invalid JSON format" },
        { status: 400 }
      );
    }

    // Extract fields
    const { username, email, password } = body;
    console.log("✅ Received Data:", { username, email, password });

    // Check for missing fields
    if (!username || !email || !password) {
      console.error("❌ Missing Fields");
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error("❌ User Already Exists");
      return NextResponse.json(
        { error: "Email is already registered" },
        { status: 400 }
      );
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save(); // Save user to MongoDB

    console.log("✅ User saved:", newUser);

    return NextResponse.json(
      { message: "User registered successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("🔥 Signup Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
