import NewAddress from "@/components/user/NewAddress";
import api from "@/tools/api";
import { headers } from "next/headers";
import React from "react";

interface Data {
  address: Address;
}

const getAddress = async (id: string) => {
  return await api<Data>(`api/address/${id}`, {
    cache: "no-store",
    headers: {
      cookie: headers().get("cookie") ?? "",
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
