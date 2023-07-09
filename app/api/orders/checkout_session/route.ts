import Stripe from "stripe";
import db from "@/backend/config/dbConnect";
import User from "@/backend/models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import errorMiddleware from "@/backend/middlewares/error";
import { connectDb } from "@/backend/config/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import isAuthenticatedUser from "@/backend/middlewares/auth";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, {
  apiVersion: "2022-11-15",
});

export async function POST(req: Request) {
  try {
    await isAuthenticatedUser(req);
    const sessions = await getServerSession(authOptions);

    const body = await req.json();

    const line_items = body?.items?.map((item: any) => {
      const urlimages = item.images.map((item: any) => item.url);

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: urlimages,
            metadata: {
              productId: item._id,
            },
          },
          unit_amount: item.price * 100,
        },

        tax_rates: ["txr_1NQtOsAovh9X3IzsAjua9lae"],
        quantity: item.quantity,
      };
    });

    const shippingInfo = body.shippingInfo;
    

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${process.env.API_URL}/me/orders?order_success=true`,
      cancel_url: `${process.env.API_URL}`,
      customer_email: sessions?.user.email,
      client_reference_id: sessions?.user._id,
      mode: "payment",
      metadata: { shippingInfo },
      shipping_options: [
        {
          shipping_rate: "shr_1NQtJfAovh9X3Izsn5zcXiMe",
        },
      ],
      line_items,
    });

    return NextResponse.json(
      { result: { url: session.url }, message: "ok" },
      { status: 200 }
    );
  } catch (error) {
    return errorMiddleware(error);
  }
}
