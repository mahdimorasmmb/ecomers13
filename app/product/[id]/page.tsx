import ProductDetails from "@/components/products/ProductDetails";
import axios from "axios";
import React from "react";

const getProductDetails = async (id: string) => {
  const { data } = await axios.get(`${process.env.API_URL}/api/products/${id}`);

  return data?.product;
};

const Page = async ({ params }: { params: any }) => {
  const product = await getProductDetails(params.id);
  return <ProductDetails product={product} />;
};

export default Page;
