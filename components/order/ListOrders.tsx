"use client";

import React, { FC, useEffect } from "react";

import { useSearchParams, useRouter } from "next/navigation";
import Pagination from "../layout/Pagination";
import OrderItem from "./OrderItem";
import { useCartStore } from "@/store/cart";
import { OrdersDataResponse } from "@/app/me/orders/page";

const ListOrders: FC<OrdersDataResponse> = ({
  orders,
  ordersCount,
  resPerPage,
}) => {
  const clearCart = useCartStore((state) => state.clearCart);
  const params = useSearchParams();
  const router = useRouter();

  const orderSuccess = params.get("order_success");

  useEffect(() => {
    if (orderSuccess === "true") {
      clearCart();
      router.replace("/me/orders");
    }
  }, []);

  return (
    <>
      <h3 dir="rtl" className="text-xl font-semibold mb-5">
        سفارشات شما
      </h3>
      {orders?.map((order: any) => (
        <OrderItem key={order.id} order={order} />
      ))}

      <Pagination resPerPage={resPerPage} itemsCount={ordersCount.length} />
    </>
  );
};

export default ListOrders;
