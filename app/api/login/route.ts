import db from "@/backend/config/dbConnect";
import User from "@/backend/models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import errorMiddleware from "@/backend/middlewares/error"

interface RequestBody {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    await db.connect();
    const body: RequestBody = await req.json();

    const user = await User.findOne({ email: body?.email }).select("+password");

    if (!user) {
      return NextResponse.json(
        { msg: "Invalid Email or Password" },
        { status: 400 }
      );
    }

    const isPasswordIsMatched = await bcrypt.compare(
      body?.password,
      user?.password
    );

    if (!isPasswordIsMatched) {
      return NextResponse.json(
        { msg: "Invalid Email or Password" },
        { status: 400 }
      );
    }

    const { password, ...userWithPass } = user;

    return NextResponse.json({ userWithPass }, { status: 200 });
  } catch (error) {
    return errorMiddleware(error);
  }
}
