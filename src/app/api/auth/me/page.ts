import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getDatafromtoken } from "@/helpers/grtdatafromtoken";
import User from "@/models/userModel";
connect();

export async function POST(request: NextRequest) {
  const userId = await getDatafromtoken(request);
  const user = await User.findOne({ _id: userId }).select("_password");
  //check if there is no user
  return NextResponse.json({
    message: "user found",
    data: user,
  });
}
