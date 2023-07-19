import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import api from "@/tools/api";
import axios from "axios";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import React from "react";

const ProductDetails = dynamic(
  () => import("@/components/products/ProductDetails")
);

interface Result {
  product: Product;
}

const getProductDetails = async (id: string) => {
  const response = await fetch(`${process.env.API_URL}/api/products/${id}`, {
    cache: "no-store",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data as Promise<Result>;
};

const getCanUserReview = async (id: string) => {
  const res = await fetch(
    `${process.env.API_URL}/api/orders/can_review/?productId=${id}`,
    {
      cache: "no-store",
      headers: {
        cookie: headers().get("cookie") ?? "",
      },
    }
  );

  const data = await res.json();

  return data.result;
};

const Page = async ({ params }: { params: any }) => {
  const serverSession = await getServerSession(authOptions);

  const product = await getProductDetails(params.id);
  const canUserReview = await getCanUserReview(params.id);
  return (
    <ProductDetails
      product={product.product}
      canUserReview={canUserReview}
      serverSession={serverSession}
    />
  );
};

export default Page;
