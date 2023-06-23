import db from "@/backend/config/dbConnect";
import User from "@/backend/models/user";
import { Error } from "mongoose";
import { NextResponse } from "next/server";
import errorMiddleware from "@/backend/middlewares/error";
import { getSession } from "next-auth/react";

interface RequestBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(requset: Request) {
  try {
    await db.connect();
    const body: RequestBody = await requset.json();
    
    // if (!body) return NextResponse.json({ error: "insert" }, { status: 400 });
    const { name, email, password: bodyPassword } = body;

    const user = await User.create({
      name,
      email,
      password: bodyPassword,
    });

    const { password, ...result } = user;

    return NextResponse.json({ result }, { status: 201 });
  } catch (error) {
    return errorMiddleware(error);
  }
}
