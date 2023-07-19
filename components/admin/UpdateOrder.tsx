"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  order: Order;
}

const UpdateOrder: FC<Props> = ({ order }) => {
  const [status, setStatus] = useState("");
  const router = useRouter();
  console.log(order);

  const handleEditedOrder = async () => {
    const res = await axios.post(`/api/orders/${order._id}`, {
      orderStatus: status,
    });

    if (res.status === 201) {
      toast.success(res.data.message);
      router.refresh();
      router.replace("/admin/orders");
    }
  };

  return (
    <article dir='rtl' className="p-3 lg:p-5 mb-5 bg-white border border-blue-600 rounded-md">
      <header className="lg:flex justify-between mb-4">
        <div className="mb-4 lg:mb-0">
          <p className="font-semibold">
            <span>Order ID: {order?._id} </span>
            {order?.orderStatus == "Processing" ? (
              <span className="text-red-500">
                • {order?.orderStatus.toUpperCase()}
              </span>
            ) : (
              <span className="text-green-500">
                • {order?.orderStatus.toUpperCase()}
              </span>
            )}
          </p>
          <p className="text-gray-500">{order?.createAt?.substring(0, 10)} </p>
        </div>
      </header>
      <div className="grid md:grid-cols-3 gap-2">
        <div>
          <p className="text-gray-400 mb-1">شخص</p>
          <ul className="text-gray-600">
            <li>{order?.user?.name}</li>
            <li>تلفن: {order?.shippingInfo?.phoneNo}</li>
            <li>پست الکترونیک: {order?.user?.email}</li>
          </ul>
        </div>
        <div>
          <p className="text-gray-400 mb-1">نشانی تحویل</p>
          <ul className="text-gray-600">
            <li>{order?.shippingInfo?.street}</li>
            <li>
              {order?.shippingInfo?.city}, {order?.shippingInfo?.state},{" "}
              {order?.shippingInfo?.zipCode}
            </li>
            <li>{order?.shippingInfo?.country}</li>
          </ul>
        </div>
        <div>
          <p className="text-gray-400 mb-1">پرداخت</p>
          <ul className="text-gray-600">
            <li className="text-green-400">
              {order?.paymentInfo?.status?.toUpperCase()}
            </li>
            <li>مالیات پرداخت شده: ${order?.paymentInfo?.taxPaid}</li>
            <li>جمع پرداختی: ${order?.paymentInfo?.amountPaid}</li>
          </ul>
        </div>
      </div>

      <hr className="my-4" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {order?.orderItems?.map((item: any) => (
          <figure key={item._id} className="flex flex-row mb-4">
            <div>
              <div className="block w-20 h-20 rounded border border-gray-200 overflow-hidden p-3">
                <Image
                  src={item?.image}
                  height="60"
                  width="60"
                  alt={item.name}
                />
              </div>
            </div>
            <figcaption className="ml-3">
              <p>{item.name.substring(0, 35)}</p>
              <p className="mt-1 font-semibold">
                {item.quantity}x = ${item.price * item.quantity}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      <hr />

      <div className="my-8">
        <label className="block mb-3"> به روز رسانی وضعیت سفارش </label>
        <div className="relative">
          <select
            className="block appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            name="category"
            required
            onChange={(e) => setStatus(e.target.value)}
            defaultValue={order.orderStatus}
          >
            {["Processing", "Shipped", "Delivered"].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <i className="absolute inset-y-0 right-0 p-2 text-gray-400">
            <svg
              width="22"
              height="22"
              className="fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M7 10l5 5 5-5H7z"></path>
            </svg>
          </i>
        </div>
      </div>

      <button
        onClick={handleEditedOrder}
        className="mb-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
      >
        به روز رسانی
      </button>
    </article>
  );
};

export default UpdateOrder;
