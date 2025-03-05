// src/models/Article.ts
import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Article =
  mongoose.models.Article || mongoose.model("Article", ArticleSchema);
export default Article;
