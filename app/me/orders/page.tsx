import React, { Suspense, cache } from "react";

import ListOrders from "@/components/order/ListOrders";
import getQueryStrings from "@/tools/getQueryStrings";
import { cookies } from "next/headers";

export interface OrdersDataResponse {
  orders: any;
  resPerPage: number;
  ordersCount: number;
}

const getOrders = async (searchParams: { [key: string]: string }) => {
  const nextCookies = cookies();
  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

  const url = {
    ["page"]: searchParams && searchParams["page"],
    ["name"]: searchParams && searchParams["name"],
  };
  const queryString = searchParams && getQueryStrings(url);
  const response = await fetch(
    `${process.env.API_URL}/api/orders/me?${queryString}`,
    {
      headers: {
        Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
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
  console.log(orders);
  return <ListOrders orders={orders} />;
};

export default Page;
