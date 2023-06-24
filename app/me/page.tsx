import Profile from "@/components/auth/Profile";
import api from "@/tools/api";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import React, { Suspense } from "react";

interface Data {
  address: [Address];
}

const getAddresses = async () => {
  const nextCookies = cookies();
  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

  const response = await fetch(`${process.env.API_URL}/api/address`, {
    cache: "no-store",
    headers: {
      Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
    },
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return (await response.json()) as Promise<Data>;
};

const Page = async () => {
  console.log('render server//////////////////////////////////////////');
  
  const data = await getAddresses();
  return <Profile dataAddresses={data.address} />;
};

export default Page;
