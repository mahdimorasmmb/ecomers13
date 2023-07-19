import isAuthenticatedUser from "@/backend/middlewares/auth";
import ErrorHandler from "@/backend/utils/errorHandler";
import uploderInPublic from "@/backend/utils/uploder_public";
import { NextResponse } from "next/server";
import errorMiddleware from "@/backend/middlewares/error";
import getUser_id from "@/backend/utils/getUser_id";
import User from "@/backend/models/user";
import { unlinkSync } from "fs";
import Product from "@/backend/models/product";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await isAuthenticatedUser(request,'admin');
    const formData = await request.formData();
    const files = formData.getAll("image") as Array<Blob> | null;

    if (!files) {
      throw new ErrorHandler("select avatar is required.", 400);
    }

    const urls: Array<{ [key: string]: string | undefined }> = [];

    for (const file of files) {
      const resUplode = await uploderInPublic(file, "buyitnow/products");
      if (resUplode instanceof ErrorHandler) {
        return resUplode;
      }
      urls.push(resUplode);
    }

    const user = await Product.findByIdAndUpdate(params.id, {
      images: urls,
    });

    return NextResponse.json(
      { result: user, message: "Update Profile successfully" },
      { status: 200 }
    );
  } catch (error) {
    return errorMiddleware(error);
  }
}
