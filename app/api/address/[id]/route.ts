import db from "@/backend/config/dbConnect";
import Address from "@/backend/models/address";
import { NextResponse } from "next/server";
import errorhan from "@/backend/middlewares/error";
import isAuthenticatedUser from "@/backend/middlewares/auth";
import ErrorHandler from "@/backend/utils/errorHandler";
import { connectDb } from "@/backend/config/db";

export async function GET(
  req: Request,
  context: {
    params: {
      id: string;
    };
  }
) {
  try {
    await isAuthenticatedUser(req);
    await connectDb();
    const address = await Address.findById(context.params.id);

    if (!address) throw new ErrorHandler("Address not found", 404);

    return NextResponse.json({ address }, { status: 200 });
  } catch (error) {
    return errorhan(error);
  }
}

export async function PATCH(
  req: Request,
  context: {
    params: {
      id: string;
    };
  }
) {
  try {
    await isAuthenticatedUser(req);

    await connectDb();
    const body: Address = await req.json();

    let address = await Address.findById(context.params.id);
    if (!address) throw new ErrorHandler("Address not found", 404);
    address = await Address.findByIdAndUpdate(context.params.id, body);

    return NextResponse.json(
      { address, message: "Address Updated" },
      { status: 200 }
    );
  } catch (error) {
    return errorhan(error);
  }
}

export async function DELETE(
  req: Request,
  context: {
    params: {
      id: string;
    };
  }
) {
  try {
    await isAuthenticatedUser(req);

    await connectDb();

    let address = await Address.findById(context.params.id);

    if (!address) throw new ErrorHandler("Address not found", 404);

    await Address.findByIdAndDelete(context.params.id);

    return NextResponse.json({ message: "deleted address" }, { status: 200 });
  } catch (error) {
    return errorhan(error);
  }
}
