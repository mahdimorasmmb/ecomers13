import { connectDb } from "@/backend/config/db";
import isAuthenticatedUser from "@/backend/middlewares/auth";
import { NextResponse } from "next/server";
import errorMiddleware from "@/backend/middlewares/error";
import User from "@/backend/models/user";
import getUser_id from "@/backend/utils/getUser_id";
import bcrypt from "bcryptjs";
import ErrorHandler from "@/backend/utils/errorHandler";

interface RequestBody {
  newPassword: string;
  currentPassword: string;
}

export async function POST(requset: Request) {
  try {
    await connectDb();
    await isAuthenticatedUser(requset);
    const body: RequestBody = await requset.json();

    const user = await User.findById(getUser_id(requset)).select("+password");
    const { newPassword, currentPassword } = body;

    const isPasswordMatched = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordMatched) {
      throw new ErrorHandler("Old password is incorrect", 400);
    }

    user.password = newPassword;
    await user.save();
   
    const { password, ...user_without_password } = user._doc

    return NextResponse.json(
      { result: user_without_password, message: "Update Password " },
      { status: 200 }
    );
  } catch (error) {
    return errorMiddleware(error);
  }
}
