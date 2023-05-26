import db from "@/backend/config/dbConnect";
import Product from "@/backend/models/product";
import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   await db.connect();
//   const body = await request.json();

//   const product = await Product.create(body);

//   return NextResponse.json({ product }, { status: 201 });
// }

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await db.connect();

  const product = await Product.findById(params.id);

  if (!product) {
    return NextResponse.json({ error: "Product not Found" }, { status: 404 });
  }

  return NextResponse.json({ product }, { status: 200 });
}
