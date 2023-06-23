import db from "@/backend/config/dbConnect";
import Product from "@/backend/models/product";
import { NextResponse } from "next/server";
import errorMiddleware from "@/backend/middlewares/error";

export async function POST(request: Request) {
  try {
    await db.connect();
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
    await db.connect();

    const product = await Product.findById(params.id);

    if (!product) {
      await db.disconnect();
      return NextResponse.json({ error: "Product not Found" }, { status: 404 });
    }
    await db.disconnect();
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    return errorMiddleware(error);
  }
}
