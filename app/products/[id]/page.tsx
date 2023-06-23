import ProductDetails from "@/components/products/ProductDetails";
import api from "@/tools/api";
import axios from "axios";
import React from "react";

interface Result {
  product: Product;
}

const getProductDetails = async (id: string) => {
  const data = await api<Result>(`/api/products/${id}`);

  return data.product;
};

const Page = async ({ params }: { params: any }) => {
  const product = await getProductDetails(params.id);
  return <ProductDetails product={product} />;
};

export default Page;
