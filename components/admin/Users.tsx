"use client";

import Link from "next/link";
import React, { FC } from "react";
import Pagination from "../layout/Pagination";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UsersDataResponse } from "@/app/admin/users/page";
import { useMutation } from "@tanstack/react-query";
import Button from "../Button";

const Users: FC<UsersDataResponse> = ({ resPerPage, users, usersCount }) => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (id: string) => axios.delete(`/api/users/${id}`),
    onSuccess(data, variables, context) {
      toast.success(data.data.message);
      router.refresh();
      router.replace("/admin/users");
    },
  });

  const deleteHandler = async (id: string) => {
    mutation.mutate(id);
  };

  return (
    <>
      <div
        dir="rtl"
        className="relative overflow-x-auto shadow-md sm:rounded-lg"
      >
        <h1 className="text-3xl my-5 ml-4 font-bold">
          {users?.length} کاربران
        </h1>
        <table className="w-full text-sm text-right">
          <thead className="text-l text-gray-700 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                نام
              </th>
              <th scope="col" className="px-6 py-3">
                پست الکترونیک
              </th>
              <th scope="col" className="px-6 py-3">
                نقش
              </th>
              <th scope="col" className="px-6 py-3">
                اقدامات
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user?._id} className="bg-white">
                <td className="px-6 py-2">{user?.name}</td>
                <td className="px-6 py-2">{user?.email}</td>
                <td className="px-6 py-2">{user?.role}</td>
                <td className="px-6 py-2">
                  <div className="flex">
                    <Link
                      href={`/admin/users/${user?._id}`}
                      className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer ml-2"
                    >
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </Link>

                    <Button
                      onClick={() => deleteHandler(user?._id)}
                      // isLoding={mutation.isLoading}
                      className="bg-red-400 hover:bg-red-600 "
                     
                    >
                       <>
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination resPerPage={resPerPage} itemsCount={usersCount} />
    </>
  );
};

export default Users;
