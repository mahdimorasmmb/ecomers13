import db from "@/backend/config/dbConnect";
import Address from "@/backend/models/address";
import { NextResponse } from "next/server";
import errorhan from "@/backend/middlewares/error";
import isAuthenticatedUser from "@/backend/middlewares/auth";
import getUser_id from "@/backend/utils/getUser_id";

export async function POST(req: Request) {
  try {
    await isAuthenticatedUser(req);

    await db.connect();
    const body: Address = await req.json();

    const address = await Address.create({ ...body, user: getUser_id(req) });

    return NextResponse.json(
      { address, message: "Add Address " },
      { status: 200 }
    );
  } catch (error) {
    return errorhan(error);
  }
}

export async function GET(req: Request) {
  try {
    await isAuthenticatedUser(req);

    await db.connect();
    const address = await Address.find({ user: getUser_id(req) });

    return NextResponse.json({ address }, { status: 200 });
  } catch (error) {
    return errorhan(error);
  }
}
