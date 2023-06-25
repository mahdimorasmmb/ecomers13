import db from "@/backend/config/dbConnect";
import Product from "@/backend/models/product";
import { NextResponse } from "next/server";
import errorMiddleware from "@/backend/middlewares/error";
import { connectDb } from "@/backend/config/db";

export async function POST(request: Request) {
  try {
    await connectDb();
    const body = await request.json();

    const product = await Product.create(body);

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    return errorMiddleware(error);
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDb();

    const product = await Product.findById(params.id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not Found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    return errorMiddleware(error);
  }
}
