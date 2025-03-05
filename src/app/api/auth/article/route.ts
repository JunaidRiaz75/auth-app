// src/app/api/articles/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import { authMiddleware } from "@/middleware/auth";
import Article from "@/models/article";

export async function GET(req: NextRequest) {
  const authResponse = authMiddleware(req);
  if (authResponse instanceof NextResponse) return authResponse;

  try {
    await connectDB();
    const articles = await Article.find().populate("author", "name email");
    return NextResponse.json({ articles }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}
