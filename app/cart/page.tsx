import dynamic from "next/dynamic";
import React from "react";
const Cart = dynamic(() => import("@/components/cart/Cart"), { ssr: false });

const Page = () => {
  return <Cart />;
};

export default Page;
