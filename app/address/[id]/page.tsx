import NewAddress from "@/components/user/NewAddress";
import api from "@/tools/api";
import { cookies } from "next/headers";
import React from "react";

interface Data {
  address: Address;
}

const getAddress = async (id: string) => {
  const nextCookies = cookies();
  const nextAuthSessionToken = nextCookies.get("next-auth.session-token");

  return await api<Data>(`api/address/${id}`, {
    cache: "no-store",
    headers: {
      Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
    },
  });
};

const Page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const address = await getAddress(params.id);
  return <NewAddress address={address.address} />;
};

export default Page;
