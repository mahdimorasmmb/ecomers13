import UpdateOrder from "@/components/admin/UpdateOrder";
import UpdateUser from "@/components/admin/UpdateUsers";
import ProductDetails from "@/components/products/ProductDetails";
import api from "@/tools/api";
import axios from "axios";
import { headers } from "next/headers";
import React from "react";

interface Result {
  product: Product;
}

const getUser = async (id: string) => {
  const response = await fetch(`${process.env.API_URL}/api/users/${id}`, {
    cache: "no-store",

    headers: {
      cookie: headers().get("cookie") ?? "",
    },
  });
  console.log(response);

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data as any;
};

const Page = async ({ params }: { params: any }) => {
  const user = await getUser(params.id);

  return <UpdateUser user={user.result} />;
};

export default Page;
