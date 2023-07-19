import { connectDb } from "@/backend/config/db";
import isAuthenticatedUser from "@/backend/middlewares/auth";
import Product from "@/backend/models/product";
import ErrorHandler from "@/backend/utils/errorHandler";
import getUser_id from "@/backend/utils/getUser_id";
import { NextResponse } from "next/server";
import errorMiddleware from "@/backend/middlewares/error";

export async function PUT(request: Request) {
  try {
    await isAuthenticatedUser(request, "admin");

    await connectDb();

    const body = await request.json();

    const review = {
      user: getUser_id(request),
      rating: Number(body.rating),
      comment: body.comment,
    };

    let product = await Product.findById(body.productId);

    if (!product) {
      throw new ErrorHandler("Product not found", 404);
    }
    
    const isReviewed = product?.reviews?.find(
      (r: any) => r.user._id?.toString() === getUser_id(request)?.toString()
    );

    if (isReviewed) {
      product?.reviews.forEach((review: any) => {
        if (review.user?.toString() === getUser_id(request)?.toString()) {
          (review.comment = body.comment), (review.rating = body.rating);
        }
      });
    } else {
      product?.reviews.push(review);
    }

    product.ratings =
      product?.reviews?.reduce((acc: any, item: any) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    return NextResponse.json(
      { result: product, message: "Product Updated" },
      { status: 201 }
    );
  } catch (error) {
    return errorMiddleware(error);
  }
}
