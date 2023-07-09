import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link className="ml-3" href="/">
      <Image src="/images/logo.png" height="40" width="50" alt="BuyItNow" />
    </Link>
  );
};

export default Logo;
