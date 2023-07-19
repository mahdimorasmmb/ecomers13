import { NextResponse } from "next/server";
import errorhan from "@/backend/middlewares/error";
import isAuthenticatedUser from "@/backend/middlewares/auth";
import getUser_id from "@/backend/utils/getUser_id";
import { connectDb } from "@/backend/config/db";

import APIFilters from "@/backend/utils/APIFilters";
import Order from "@/backend/models/order";
import User from "@/backend/models/user";
import ErrorHandler from "@/backend/utils/errorHandler";

export async function GET(req: Request) {
  try {
    await isAuthenticatedUser(req, "admin");

    await connectDb();
    const resPerPage = 2;
    const usersCount = await User.countDocuments();
    const { searchParams } = new URL(req.url);

    const apiFilters = new APIFilters(User.find(), searchParams).pagination(
      resPerPage
    );

    const users = await apiFilters.query;

    return NextResponse.json(
      { usersCount, resPerPage, users },
      { status: 201 }
    );
  } catch (error) {
    return errorhan(error);
  }
}

