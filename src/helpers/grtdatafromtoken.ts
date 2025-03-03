import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
connect();
export const getDatafromtoken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedtoken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedtoken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
