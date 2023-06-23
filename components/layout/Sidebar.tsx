"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  const logoutHandler = () => {
    signOut();
  };

  return (
    <aside dir="rtl" className="md:w-1/3 lg:w-1/5  border-2 rounded-md ">
      <ul className="sidebar">
        <>
          <li>
            {" "}
            <Link
              href="/admin/products/new"
              className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
            >
             محصول جدید <span className="text-red-500">(Admin)</span>
            </Link>
          </li>

          <li>
            {" "}
            <Link
              href="/admin/products"
              className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
            >
            همه محصولات <span className="text-red-500">(Admin)</span>
            </Link>
          </li>

          <li>
            {" "}
            <Link
              href="/admin/orders"
              className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
            >
           همه سفارشات <span className="text-red-500">(Admin)</span>
            </Link>
          </li>

          <li>
            {" "}
            <Link
              href="/admin/users"
              className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
            >
              تمام کاربران <span className="text-red-500">(Admin)</span>
            </Link>
          </li>

          <hr />
        </>

        <li>
          {" "}
          <Link
            href="/me"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
         مشخصات شما
          </Link>
        </li>
        <li>
          {" "}
          <Link
            href="/me/orders"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
          سفارشات
          </Link>
        </li>
        <li>
          {" "}
          <Link
            href="/me/update"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
          بروزرسانی پروفایل
          </Link>
        </li>
        <li>
          {" "}
          <Link
            href="/me/update_password"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
         بروزرسانی رمز عبور
          </Link>
        </li>

        <li>
          {" "}
          <a
            className="block px-3 py-2 text-red-800 hover:bg-red-100 hover:text-white-500 rounded-md cursor-pointer"
            onClick={logoutHandler}
          >
       خروج
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
