import { connectDb } from "@/backend/config/db";
import { NextResponse } from "next/server";
import errorMiddleware from "@/backend/middlewares/error";
import Product from "@/backend/models/product";

export async function GET(request: Request) {
  try {
    await connectDb();
    const resPerPage = 3;

    const { searchParams } = new URL(request.url);

    const products = await Product.find({
      name: {
        $regex: searchParams.get("name"),
        $options: "i",
      },
      category: {
        $regex: searchParams.get("category"),
        $options: "i",
      },
    });
    // { products, filteredProductsCount, resPerPage, productsCount }
    return NextResponse.json({ products, message: "ok" }, { status: 200 });
  } catch (error) {
    return errorMiddleware(error);
  }
}
