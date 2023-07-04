"use client";

import React, { FC } from "react";
import { Search } from "./Search";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useCartStore } from "@/store/cart";

interface Props {
  session: Session | null;
}
const Header: FC<Props> = ({ session }) => {
  const totalItems = useCartStore((state) => state.totalItems);
  const clientSession = useSession();
  const user = session
    ? (session.user as User)
    : (clientSession.data?.user as User);


  return (
    <header dir="rtl" className="bg-white py-2 border-b">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap items-center">
          <div className="flex-shrink-0 ml-5">
            <Link href="/">
              <Image
                src="/images/logo.png"
                height="40"
                width="50"
                alt="BuyItNow"
              />
            </Link>
          </div>
          <Search />
          <div className="flex flex-row-reverse items-center space-x-2 mr-auto">
            <Link
              href="/cart"
              className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
            >
              <i className="text-gray-400 w-5 fa fa-shopping-cart"></i>
              <span className="hidden lg:inline ml-1">
                سبد خرید (<b>{totalItems || 0}</b>)
              </span>
            </Link>

            {user ? (
              <Link href="/me">
                <div className="flex gap-4 items-center mb-4 space-x-3 mt-4 cursor-pointer">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user?.avatar?.url || "/images/default.png"}
                  />
                  <div className="space-y-1 font-medium">
                    <p>
                      {user.name}
                      <time className="block text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </time>
                    </p>
                  </div>
                </div>
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
              >
                <i className="text-gray-400 w-5 fa fa-user"></i>
                <span className="hidden lg:inline ml-1">ورود</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
