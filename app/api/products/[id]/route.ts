import db from "@/backend/config/dbConnect";
import Product from "@/backend/models/product";
import { NextResponse } from "next/server";
import errorMiddleware from "@/backend/middlewares/error";
import { connectDb } from "@/backend/config/db";
import isAuthenticatedUser from "@/backend/middlewares/auth";
import ErrorHandler from "@/backend/utils/errorHandler";
import { cloudinary } from "@/backend/utils/cloudinary";

// export async function POST(request: Request) {
//   try {
//     await connectDb();
//     const body = await request.json();

//     const product = await Product.create(body);

//     return NextResponse.json({ product }, { status: 201 });
//   } catch (error) {
//     return errorMiddleware(error);
//   }
// }

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDb();

    const product = await Product.findById(params.id).populate("reviews.user");

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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await isAuthenticatedUser(request, "admin");

    await connectDb();

    const body = await request.json();

    let product = await Product.findById(params.id);

    if (!product) {
      throw new ErrorHandler("Product not found", 404);
    }

    product = await Product.findByIdAndUpdate(params.id, body);

    return NextResponse.json(
      { result: product, message: "Product Updated" },
      { status: 201 }
    );
  } catch (error) {
    return errorMiddleware(error);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await isAuthenticatedUser(request, "admin");

    await connectDb();

    const product = await Product.findById(params.id);

    if (!product) {
      throw new ErrorHandler("Product not found", 404);
    }

    for (let i = 0; i < product.images.length; i++) {
      const res = await cloudinary.v2.uploader.destroy(
        product.images[0].public_id
      );
    }

    await product.deleteOne();

    return NextResponse.json(
      { result: product, message: "Product Deleted" },
      { status: 200 }
    );
  } catch (error) {
    return errorMiddleware(error);
  }
}
