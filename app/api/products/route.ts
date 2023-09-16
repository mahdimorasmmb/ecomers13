import Product from "@/backend/models/product";
import APIFilters from "@/backend/utils/APIFilters";
import errorMiddleware from "@/backend/middlewares/error";
import { Query } from "mongoose";
import { NextResponse } from "next/server";
import { connectDb } from "@/backend/config/db";
import { cloudinary } from "@/backend/utils/cloudinary";
import isAuthenticatedUser from "@/backend/middlewares/auth";
import { authOptions } from "../auth/[...nextauth]/route";
import getUser_id from "@/backend/utils/getUser_id";
import ErrorHandler from "@/backend/utils/errorHandler";

interface ProductDocument extends Document {
  // Define the properties of the Product document
}

export async function POST(request: Request) {
  try {
    await isAuthenticatedUser(request, "admin");
    await connectDb();
    const body = await request.json();

    const product = await Product.create({
      ...body,
      user: getUser_id(request),
    });

    return NextResponse.json(
      { result: product, message: "Product Create" },
      { status: 201 }
    );
  } catch (error) {
    return errorMiddleware(error);
  }
}

export async function GET(request: Request) {
  try {
    await connectDb();
    const resPerPage = 3;
    const productsCount = await Product.countDocuments();


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
      { products, filteredProductsCount, resPerPage, productsCount },
      { status: 200 }
    );
  } catch (error) {
    return errorMiddleware(error);
  }
}

