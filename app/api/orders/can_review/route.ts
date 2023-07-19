import { connectDb } from "@/backend/config/db";
import isAuthenticatedUser from "@/backend/middlewares/auth";
import Order from "@/backend/models/order";
import getUser_id from "@/backend/utils/getUser_id";
import { NextResponse } from "next/server";
import errorMiddleware from "@/backend/middlewares/error";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await isAuthenticatedUser(request);

    const { searchParams } = new URL(request.url);

    await connectDb();

    const orders = await Order.find({
      user: getUser_id(request),
      "orderItems.product": searchParams.get("productId"),
    });

    let canReview = orders?.length >= 1 ? true : false;

    return NextResponse.json(
      { result: canReview, message: "ok" },
      { status: 200 }
    );
  } catch (error) {
    return errorMiddleware(error);
  }
}
