"use client";

import Link from "next/link";
import React from "react";
import Pagination from "../layout/Pagination";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Props {}

const Orders = ({ orders }: { orders: any }) => {
  const router = useRouter();

  const handleDeletedOrder = async (id: string) => {
    const res = await axios.delete(`/api/orders/${id}`);

    if (res.status === 201) {
      toast.success(res.data.message);
      router.refresh();
      router.replace("/admin/orders");
    }
  };
  return (
   <>
    <div dir='rtl' className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-3xl my-5 ml-4 font-bold">
        {orders?.ordersCount} سفارشات
      </h1>
      <table className="w-full text-sm text-left">
        <thead className="text-l text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
            شناسه
            </th>
            <th scope="col" className="px-6 py-3">
            مبلغ پرداخت شده
            </th>
            <th scope="col" className="px-6 py-3">
            وضعیت
            </th>
            <th scope="col" className="px-6 py-3">
            اقدامات
            </th>
          </tr>
        </thead>
        <tbody>
          {orders?.orders?.map((order: any) => (
            <tr key={order._id} className="bg-white">
              <td className="px-6 py-2">{order?._id}</td>
              <td className="px-6 py-2">${order?.paymentInfo?.amountPaid}</td>
              <td className="px-6 py-2">{order?.orderStatus}</td>
              <td className="px-6 py-2">
                <div>
                  <Link
                    href={`/admin/orders/${order?._id}`}
                    className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                  >
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </Link>
                  <a
                    onClick={() => handleDeletedOrder(order._id)}
                    className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
    </div>
    <div className="mb-6">
    <Pagination
      resPerPage={orders?.resPerPage}
      itemsCount={orders?.ordersCount}
    />
  </div>
   </>
  );
};

export default Orders;
