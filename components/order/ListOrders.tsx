"use client";

import React, { useContext, useEffect } from "react";

import { useSearchParams, useRouter } from "next/navigation";
import Pagination from "../layout/Pagination";
import OrderItem from "./OrderItem";
import { useCartStore } from "@/store/cart";

const ListOrders = ({ orders }:{orders:any}) => {
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
      <h3 dir="rtl" className="text-xl font-semibold mb-5">سفارشات شما</h3>
      {orders?.orders?.map((order:any) => (
        <OrderItem key={order.id} order={order} />
      ))}

      <Pagination
        resPerPage={orders?.resPerPage}
        productCount={orders?.ordersCount}
      />
    </>
  );
};

export default ListOrders;
