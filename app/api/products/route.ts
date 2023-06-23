import db from "@/backend/config/dbConnect";
import Product from "@/backend/models/product";
import APIFilters from "@/backend/utils/APIFilters";
import errorMiddleware from "@/backend/middlewares/error";
import { Query } from "mongoose";
import { NextResponse } from "next/server";

interface ProductDocument extends Document {
  // Define the properties of the Product document
}


export async function POST(request: Request) {
 try {
  await db.connect();
  const body = await request.json();

  const product = await Product.create(body);

  await db.disconnect();
  return NextResponse.json({ product }, { status: 201 });
 } catch (error) {
  return errorMiddleware(error);
}
}

export async function GET(request: Request) {
  try {
    await db.connect();
    const resPerPage = 3;
    const productCount = await Product.countDocuments();

    const { searchParams } = new URL(request.url);

    const apiFilters = new APIFilters(
      Product.find() as Query<ProductDocument[], ProductDocument, {}>,
      searchParams
    ).search();

    let products = await apiFilters.query;
    const filteredProductsCount = products.length;

    apiFilters.pagination(resPerPage);

    products = await apiFilters.query.clone();

    await db.disconnect();

    return NextResponse.json(
      { products, filteredProductsCount, resPerPage, productCount },
      { status: 200 }
    );
  } catch (error) {
    return errorMiddleware(error);
  }
}
