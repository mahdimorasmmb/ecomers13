import ProductDetails from "@/components/products/ProductDetails";
import api from "@/tools/api";
import axios from "axios";
import React from "react";

interface Result {
  product: Product;
}

const getProductDetails = async (id:string) => {
  const response = await fetch(`${process.env.API_URL}/api/products/${id}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return (await response.json()) as Promise<Result>;
};

const Page = async ({ params }: { params: any }) => {
  const product = await getProductDetails(params.id);
  return <ProductDetails product={product.product} />;
};

export default Page;
