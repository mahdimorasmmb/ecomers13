import Order from "@/backend/models/order";
import getCartItems from "@/backend/utils/getItems";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import errorMiddleware from "@/backend/middlewares/error";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, {
  apiVersion: "2022-11-15",
});

export async function POST(req: Request) {
  try {
    const signature = req.headers.get("stripe-signature") || "";
    console.log(signature);

    const buffer = Buffer.from(await req.arrayBuffer());

    const event = stripe.webhooks.constructEvent(
      buffer,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;

      const line_items = await stripe.checkout.sessions.listLineItems(
        session.id
      );

      const orderItems = await getCartItems(line_items);
      const userId = session.client_reference_id;
      const amountPaid = session.amount_total / 100;

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
        amountPaid,
        taxPaid: session.total_details.amount_tax / 100,
      };

      const orderData = {
        user: userId,
        shippingInfo: session.metadata.shippingInfo,
        paymentInfo,
        orderItems,
      };

      const order = await Order.create(orderData);

      console.log(order);

    return  NextResponse.json({}, { status: 201 });
    }
  } catch (error) {
    console.log(error);

    return errorMiddleware(error);
  }
}
