import { NextResponse } from "next/server";
import errorhan from "@/backend/middlewares/error";
import isAuthenticatedUser from "@/backend/middlewares/auth";
import getUser_id from "@/backend/utils/getUser_id";
import { connectDb } from "@/backend/config/db";

import APIFilters from "@/backend/utils/APIFilters";
import Order from "@/backend/models/order";
import User from "@/backend/models/user";
import ErrorHandler from "@/backend/utils/errorHandler";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      await isAuthenticatedUser(request, "admin");
  
      await connectDb();
  
  
      let user = await User.findById(params.id);
  
      if (!user) {
        throw new ErrorHandler("No User found with this ID", 404);
      }
  
  
      return NextResponse.json(
        { result: user, message: "Ok" },
        { status: 201 }
      );
    } catch (error) {
      return errorhan(error);
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
  
      let user = await User.findById(params.id);
  
      if (!user) {
        throw new ErrorHandler("No User found with this ID", 404);
      }
  
      user = await User.findByIdAndUpdate(params.id, body);
  
      return NextResponse.json(
        { result: user, message: "User Updated" },
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
  
  
      let user = await User.findById(params.id);
  
      if (!user) {
        throw new ErrorHandler("No User found with this ID", 404);
      }
  
      await user.deleteOne();
  
      return NextResponse.json(
        { result: user, message: "User Deleted" },
        { status: 201 }
      );
    } catch (error) {
      return errorhan(error);
    }
  }
  