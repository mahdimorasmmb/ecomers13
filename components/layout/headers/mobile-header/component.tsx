import React from "react";
import MobileNav from "./mobile-nav";
import Logo from "../MiddleHeader/Logo";
import Link from "next/link";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import Button from "@/components/Button";

const MobileHeader = () => {
  return (
    <header className="flex lg:hidden items-center justify-between p-4">
      <MobileNav />
      <Logo size="small" />

      <Link href={"/login"}>
        <Button className="p-0" variant="ghost" >
          <UserIcon className="h-9 w-9 " />
        </Button>
      </Link>
    </header>
  );
};

export default MobileHeader;
