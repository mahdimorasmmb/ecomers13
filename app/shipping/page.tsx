import Profile from "@/components/auth/Profile";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import React, { Suspense, cache } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AddressModel from "@/backend/models/address";
import { connectDb } from "@/backend/config/db";

import dynamic from "next/dynamic";


const Shipping = dynamic(() => import("@/components/cart/Shipping"),{
  ssr:false,
  
})

const getAddresses = async () => {
  const session = await getServerSession(authOptions);

  await connectDb();

  const address = await AddressModel.find({ user: session?.user._id });

  return address as [Address];
};

const Page = async () => {
  const addresses = await getAddresses();
  return <Shipping addresses={addresses} />;
};

export default Page;
