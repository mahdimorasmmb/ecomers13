import { NextResponse } from "next/server";
import errorhan from "@/backend/middlewares/error";
import isAuthenticatedUser from "@/backend/middlewares/auth";
import getUser_id from "@/backend/utils/getUser_id";
import { connectDb } from "@/backend/config/db";

import APIFilters from "@/backend/utils/APIFilters";
import Order from "@/backend/models/order";
import ErrorHandler from "@/backend/utils/errorHandler";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await isAuthenticatedUser(request, "admin");

    await connectDb();

    const order = await Order.findById(params.id).populate("shippingInfo");

    if (!order) {
      throw new ErrorHandler("No Order found with this ID", 404);
    }

    return NextResponse.json({ result: order, message: "ok" }, { status: 200 });
  } catch (error) {
    return errorhan(error);
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await isAuthenticatedUser(request, "admin");

    await connectDb();

    const body = await request.json();

    let order = await Order.findById(params.id);

    if (!order) {
      throw new ErrorHandler("No Order found with this ID", 404);
    }

    order = await Order.findByIdAndUpdate(params.id, {
      orderStatus: body.orderStatus,
    });

    return NextResponse.json(
      { result: order, message: "Order Updated" },
      { status: 201 }
    );
  } catch (error) {
    return errorhan(error);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await isAuthenticatedUser(request, "admin");

    await connectDb();

    let order = await Order.findById(params.id);

    if (!order) {
      throw new ErrorHandler("No Order found with this ID", 404);
    }

    await order.deleteOne();

    return NextResponse.json(
      { result: order, message: "Order Deleted" },
      { status: 201 }
    );
  } catch (error) {
    return errorhan(error);
  }
}
