"use client";

import Link from "next/link";
import React, { FC, useContext, useState } from "react";
import { toast } from "react-toastify";

import { useCartStore } from "@/store/cart";
import BreadCrumbs from "../layout/BreadCrumbs";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import Button from "../Button";

interface Props {
  addresses: [Address];
}

const Shipping: FC<Props> = ({ addresses }) => {
  const router = useRouter();
  const {
    addToCart,
    cart,
    removeFromCart,
    totalItems,
    totalPrice,
    decreaseCart,
  } = useCartStore((state) => state);

  const [shippingInfo, setShippinInfo] = useState("");

  const setShippingAddress = (address: Address) => {
    setShippinInfo(address._id);
  };

  const checkoutHandler = async () => {
    if (!shippingInfo) {
      return toast.error("Please select your shipping address");
    }

    try {
      const { data } = await axios.post(`/api/orders/checkout_session`, {
        items: cart,
        shippingInfo,
      });

      router.push(data.result.url);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const breadCrumbs = [
    { name: "صفحه اصلی", url: "/" },
    { name: "سبد خرید", url: "/cart" },
    { name: "سفارش", url: "" },
  ];
  const taxAmount = totalPrice * 0.15;
  const totalAmount = totalPrice.toFixed(2);

  return (
    <div dir="rtl">
      <BreadCrumbs breadCrumbs={breadCrumbs} />
      <section className="py-10 bg-gray-50">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 lg:gap-8">
            <main className="md:w-2/3">
              <article className="border border-gray-200 bg-white shadow-sm rounded p-4 lg:p-6 mb-5">
                <h2 className="text-xl font-semibold mb-5">
                  اطلاعات حمل و نقل
                </h2>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {addresses?.map((address) => (
                    <label
                      key={address._id}
                      className="flex p-3 border border-gray-200 rounded-md bg-gray-50 hover:border-blue-400 hover:bg-blue-50 cursor-pointer"
                      onClick={() => setShippingAddress(address)}
                    >
                      <span>
                        <input
                          name="shipping"
                          type="radio"
                          className="h-4 w-4 mt-1"
                        />
                      </span>
                      <p className="mr-2">
                        <span>{address.street}</span>
                        <small className="block text-sm text-gray-400">
                          {address.city}, {address.state}, {address.zipCode}
                          <br />
                          {address.country}
                          <br />
                          {address.phoneNo}
                        </small>
                      </p>
                    </label>
                  ))}
                </div>

                <Link href="/address/new">
                  <Button
                    className="flex items-center gap-2"
                   
                  >
                     <>
                        <i className="mr-1 fa fa-plus"></i>آدرس جدید اضافه کنید
                      </>
                  </Button>
                </Link>

                <div className="flex gap-2 justify-end space-x-2 mt-10">
                  <Link
                    href="/cart"
                    className="px-5 py-2 inline-block text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
                  >
                    عقب
                  </Link>
                  <a
                    className="   px-5 py-2 inline-block text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 cursor-pointer"
                    onClick={checkoutHandler}
                  >
                    پرداخت
                  </a>
                </div>
              </article>
            </main>
            <aside className="md:w-1/3">
              <article className="text-gray-600" style={{ maxWidth: "350px" }}>
                <h2 className="text-lg font-semibold mb-3">خلاصه</h2>
                <ul>
                  <li className="flex justify-between mb-1">
                    <span>میزان:</span>
                    <span>${totalAmount}</span>
                  </li>
                  <li className="flex justify-between mb-1">
                    <span>مالیات تخمینی:</span>
                    <span>${taxAmount.toFixed(2)}</span>
                  </li>
                  <li className="border-t flex justify-between mt-3 pt-3">
                    <span>مقدار کل:</span>
                    <span className="text-gray-900 font-bold">
                      <span>${Number(taxAmount + totalPrice).toFixed(2)}</span>
                    </span>
                  </li>
                </ul>

                <hr className="my-4" />

                <h2 className="text-lg font-semibold mb-3">
                  اقلام در سبد خرید
                </h2>

                {cart?.map((item) => (
                  <figure
                    key={item._id}
                    className="flex items-center mb-4 leading-5"
                  >
                    <div>
                      <div className="block relative w-20 h-20 rounded p-1 border border-gray-200">
                        <Image
                          width="50"
                          height="50"
                          src={item.images[0]?.url}
                          alt="Title"
                        />
                        <span className="absolute -top-2 -right-2 w-6 h-6 text-sm text-center flex items-center justify-center text-white bg-gray-400 rounded-full">
                          {item.quantity}
                        </span>
                      </div>
                    </div>
                    <figcaption className="mr-3">
                      <p>{item.name.substring(0, 50)}</p>
                      <p className="mt-1 text-gray-400">
                        Total: ${item.quantity * item.price}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </article>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shipping;
