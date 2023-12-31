import errorMiddleware from "@/backend/middlewares/error";


import { NextRequest, NextResponse } from "next/server";
import ErrorHandler from "@/backend/utils/errorHandler";

import uploderInPublic from "@/backend/utils/uploder_public";
import User from "@/backend/models/user";
import getUser_id from "@/backend/utils/getUser_id";
import isAuthenticatedUser from "@/backend/middlewares/auth";
interface RequestBody {
  name: string;
  email: string;
  avatar: Array<string>;
}

export async function PUT(request: NextRequest) {
  try {
    await isAuthenticatedUser(request);

    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const file = formData.get("image") as Blob | null;

    console.log(formData);
    

    if (!file) {
      throw new ErrorHandler("select avatar is required.", 400);
    }

    const resUplode = await uploderInPublic(file, "/buyitnow/avatars");
    const avatar = resUplode;

    const user = await User.findByIdAndUpdate(getUser_id(request), {
      avatar,
      email,
      name,
    });

    return NextResponse.json(
      { result: user, message: "Update Profile successfully" },
      { status: 200 }
    );
  } catch (error) {
    return errorMiddleware(error);
  }
}
