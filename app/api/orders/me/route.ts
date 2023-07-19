import db from "@/backend/config/dbConnect";
import Address from "@/backend/models/address";
import { NextResponse } from "next/server";
import errorhan from "@/backend/middlewares/error";
import isAuthenticatedUser from "@/backend/middlewares/auth";
import getUser_id from "@/backend/utils/getUser_id";
import { connectDb } from "@/backend/config/db";

import APIFilters from "@/backend/utils/APIFilters";
import Order from "@/backend/models/order";

export async function GET(req: Request) {
  try {
    await isAuthenticatedUser(req);

    await connectDb();
    const resPerPage = 2;
    const ordersCount = await Order.countDocuments().find({
      user: getUser_id(req),
    });
    const { searchParams } = new URL(req.url);

    const apiFilters = new APIFilters(Order.find(), searchParams).pagination(
      resPerPage
    );

    const orders = await apiFilters.query
      .find({ user: getUser_id(req) })
      .populate("shippingInfo user");

    return NextResponse.json(
      { ordersCount, resPerPage, orders },
      { status: 200 }
    );
  } catch (error) {
    return errorhan(error);
  }
}
