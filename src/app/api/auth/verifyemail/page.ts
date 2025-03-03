import { connect } from "@/dbConfig/dbConfig";
import user from "@/models/userModel";
import User from "@/models/userModel";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { useDebugValue } from "react";

connect();
export async function POST(request: NextResponse) {
  try {
    const reqbody = await request.json();
    const { token } = reqbody;
    console.log(token);
    const user = await User.findOne({
      verifytoken: token,
      verifytokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ error: "invalid token" }, { status: 400 });
    }
    user.isVerified = true;
    user.verifytoken = undefined;
    user.verifytokenExpiry = undefined;
    await user.save();
    return NextResponse.json(
      { message: "Email verified Successfully", success: true },
      { status: 500 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
