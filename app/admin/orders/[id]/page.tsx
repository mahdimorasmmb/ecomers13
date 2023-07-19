import UpdateOrder from "@/components/admin/UpdateOrder";
import { headers } from "next/headers";
import React from "react";

const getOrder = async (id: string) => {
  const response = await fetch(`${process.env.API_URL}/api/orders/${id}`, {
    cache: "no-store",
    headers: {
      cookie: headers().get("cookie") ?? "",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data as any;
};

const Page = async ({ params }: { params: { id: string } }) => {
  const order = await getOrder(params.id);
  return <UpdateOrder order={order.result} />;
};

export default Page;
