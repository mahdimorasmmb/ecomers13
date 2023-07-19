import NewProduct from "@/components/admin/NewProducts";
import React from "react";

const getrProduct = async (id: string) => {
  const response = await fetch(`${process.env.API_URL}/api/products/${id}`, {
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  return data.product as Promise<Product>;
};

const Page = async ({ params }: { params: { id: string } }) => {
   
    
  const data = await getrProduct(params.id);
  return <NewProduct product={data} />;
};

export default Page;
