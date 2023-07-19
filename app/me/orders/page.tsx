import React, { Suspense, cache } from "react";

import ListOrders from "@/components/order/ListOrders";
import getQueryStrings from "@/tools/getQueryStrings";
import { cookies, headers } from "next/headers";

export interface OrdersDataResponse {
  orders: Array<Order>;
  ordersCount: Array<Order>;
  resPerPage: number;
}

const getOrders = async (searchParams: { [key: string]: string }) => {
  const url = {
    ["page"]: searchParams && searchParams["page"],
    ["name"]: searchParams && searchParams["name"],
  };
  const queryString = searchParams && getQueryStrings(url);
  const response = await fetch(
    `${process.env.API_URL}/api/orders/me?${queryString}`,
    {
      headers: {
        cookie: headers().get("cookie") ?? "",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  return data as Promise<OrdersDataResponse>;
};

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const orders = await getOrders(searchParams);
  return <ListOrders {...orders} />;
};

export default Page;
