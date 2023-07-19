import axios from "axios";
import React from "react";

import { cookies, headers } from "next/headers";
import queryString from "query-string";
import Users from "@/components/admin/Users";

export interface UsersDataResponse {
  usersCount: number;
  resPerPage: number;
  users: Array<User>;
}

const getUsers = async (searchParams: {
  [key: string]: string | string[] | undefined;
}) => {
  const urlParams = {
    page: searchParams.page || 1,
  };

  const searchQuery = queryString.stringify(urlParams);

  const response = await fetch(
    `${process.env.API_URL}/api/users?${searchQuery}`,
    {
      headers: {
        cookie: headers().get("cookie") ?? "",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  return data as UsersDataResponse;
};

const AdminUsersPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const data = await getUsers(searchParams);

  console.log(data);
  
  return <Users {...data} />;
};

export default AdminUsersPage;
