"use client";

import React from "react";

import Link from "next/link";
import { useCartStore } from "@/store/cart";
import Image from "next/image";

const Cart = () => {
  const {
    addToCart,
    cart,
    removeFromCart,
    totalItems,
    totalPrice,
    decreaseCart,
  } = useCartStore((state) => state);

  const taxAmount = totalPrice * 0.15;

  const totalAmount = totalPrice.toFixed(2);

  return (
    <>
      <section dir="rtl" className="py-5 sm:py-7 bg-blue-100">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-2">
            {totalItems || 0} مورد در سبد خرید
          </h2>
        </div>
      </section>

      {totalItems > 0 && (
        <section dir="rtl" className="py-10">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4">
              <main className="md:w-3/4">
                <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                  {cart?.map((cartItem) => (
                    <div key={cartItem._id}>
                      <div className="flex flex-wrap lg:flex-row gap-10  mb-4">
                        <div className="w-full lg:w-2/5 xl:w-2/4">
                          <figure className="flex leading-5">
                            <div>
                              <div className="block  w-16 h-16 rounded border border-gray-200 overflow-hidden">
                                <Image
                                  width={100}
                                  height={100}
                                  src={cartItem.images[0]?.url}
                                  alt={cartItem.name}
                                />
                              </div>
                            </div>
                            <figcaption className="mr-3">
                              <p>
                                <a href="#" className="hover:text-blue-600">
                                  {cartItem.name}
                                </a>
                              </p>
                              <p className="mt-1 text-gray-400">
                                {" "}
                                فروشنده: {cartItem.seller}
                              </p>
                            </figcaption>
                          </figure>
                        </div>
                        <div className="w-24">
                          <div className="flex flex-row-reverse h-10 w-full rounded-lg relative bg-transparent mt-1">
                            <button
                              data-action="decrement"
                              className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                              onClick={() => decreaseCart(cartItem)}
                            >
                              <span className="m-auto text-2xl font-thin">
                                −
                              </span>
                            </button>
                            <input
                              type="number"
                              className=" focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-900  outline-none custom-input-number"
                              name="custom-input-number"
                              value={cartItem.quantity}
                              readOnly
                            ></input>
                            <button
                              data-action="increment"
                              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                              onClick={() => addToCart(cartItem)}
                            >
                              <span className="m-auto text-2xl font-thin">
                                +
                              </span>
                            </button>
                          </div>
                        </div>
                        <div>
                          <div className="">
                            <p className="font-semibold not-italic">
                              ${(cartItem.price * cartItem.quantity).toFixed(2)}
                            </p>
                            <small className="text-gray-400">
                              {" "}
                              ${cartItem.price} /قیمت هر مورد{" "}
                            </small>
                          </div>
                        </div>
                        <div className="mr-auto">
                          <div className="float-right">
                            <a
                              className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                              onClick={() => removeFromCart(cartItem)}
                            >
                              حذف
                            </a>
                          </div>
                        </div>
                      </div>

                      <hr className="my-4" />
                    </div>
                  ))}
                </article>
              </main>
              <aside className="md:w-1/4">
                <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                  <ul className="mb-5">
                    <li className="flex justify-between text-gray-600  mb-1">
                      <span>مبلغ قبل از مالیات:</span>
                      <span>${totalAmount}</span>
                    </li>
                    <li className="flex justify-between text-gray-600  mb-1">
                      <span>تعداد:</span>
                      <span>{totalItems || 0}</span>
                    </li>
                    <li className="flex justify-between text-gray-600  mb-1">
                      <span>مالیات:</span>
                      <span>${taxAmount.toFixed(2)}</span>
                    </li>
                    <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
                      <span>جمع:</span>
                      <span>${Number(taxAmount + totalPrice).toFixed(2)}</span>
                    </li>
                  </ul>

                  <Link
                    href="/shipping"
                    className="px-4 py-3 mb-2 inline-block text-lg w-full text-center font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 cursor-pointer"
                  >
                    ادامه
                  </Link>

                  <Link
                    href="/"
                    className="px-4 py-3 inline-block text-lg w-full text-center font-medium text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100"
                  >
                    بازگشت به فروشگاه
                  </Link>
                </article>
              </aside>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Cart;
