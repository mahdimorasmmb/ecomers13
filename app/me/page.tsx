import Profile from "@/components/auth/Profile";
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

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data as Promise<Data>;
};

const Page = async () => {
  const data = await getAddresses();
  return <Profile dataAddresses={data.address} />;
};

export default Page;
