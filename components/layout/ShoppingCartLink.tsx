"use client";

import { useCartStore } from "@/store/cart";
import Link from "next/link";

import React, { useEffect, useState } from "react";

const ShoppingCartLink = () => {
  const totalItems = useCartStore((state) => state.totalItems);
  const [isHydrated, setIsHydrated] = useState(false)

  // Wait till Next.js rehydration completes
  useEffect(() => {
    setIsHydrated(true)
  }, [])
  return (
    <Link
      href="/cart"
      className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
    >
      <i className="text-gray-400 w-5 fa fa-shopping-cart"></i>
      <span className="hidden lg:inline ml-1">
        سبد خرید (<span>{isHydrated ? totalItems :0}</span>)
      </span>
    </Link>
  );
};

export default ShoppingCartLink;
