import { baseUrl } from "@/app/page";
import ProductDetails from "@/components/products/ProductDetails";
import api from "@/tools/api";
import axios from "axios";
import React from "react";

interface Result {
  product: Product;
}

const getProductDetails = async (id:string) => {
  const response = await fetch(`${baseUrl}/api/products/${id}`, {
    cache: "no-store",
  });
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message);
  }
  return (data) as Promise<Result>;
};

const Page = async ({ params }: { params: any }) => {
  const product = await getProductDetails(params.id);
  return <ProductDetails product={product.product} />;
};

export default Page;
