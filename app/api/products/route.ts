
import Product from "@/backend/models/product";
import APIFilters from "@/backend/utils/APIFilters";
import errorMiddleware from "@/backend/middlewares/error";
import { Query } from "mongoose";
import { NextResponse } from "next/server";
import { connectDb } from "@/backend/config/db";

interface ProductDocument extends Document {
  // Define the properties of the Product document
}


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

export async function GET(request: Request) {
  try {
    await connectDb();
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

   

    return NextResponse.json(
      { products, filteredProductsCount, resPerPage, productCount },
      { status: 200 }
    );
  } catch (error) {
    return errorMiddleware(error);
  }
}
