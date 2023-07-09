import React from "react";
import { Search } from "./Search";

import { getServerSession } from "next-auth";

import UserAvatarLink from "./UserAvatarLink";
import Logo from "./Logo";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dynamic from "next/dynamic";

const ShoppingCartLink = dynamic(() => import("./ShoppingCartLink"));

const Header = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header dir="rtl" className="bg-white py-2 border-b">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap items-center">
          <Logo />
          <Search />
          <div className="flex flex-row-reverse items-center space-x-2 mr-auto">
            <ShoppingCartLink />
            <UserAvatarLink session={session || null} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
