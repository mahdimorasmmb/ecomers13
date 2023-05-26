import db from "@/backend/config/dbConnect";
import Product from "@/backend/models/product";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await db.connect();
  const body = await request.json();

  const product = await Product.create(body);

  return NextResponse.json({ product }, { status: 201 });
}

export async function GET() {
  await db.connect();
  const products = await Product.find();

  return NextResponse.json({ products }, { status: 200 });
}
