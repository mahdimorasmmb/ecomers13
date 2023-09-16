import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface LogoProps {
  size?: "small" | "large";
  width?: number;
  height?: number;
}

const Logo: FC<LogoProps> = ({ size = "large", height, width }) => {
  const genarateSize = () => {
    switch (size) {
      case "small":
        return {
          width: 150,
          height: 35,
        };
      case "large":
        return {
          width: 173,
          height: 41,
        };
      default:
        return {
          width,
          height,
        };
    }
  };
  return (
    <Link href="/">
      <Button className="hover:bg-inherit" variant="ghost">
        <Image
          className=""
          src="/images/new_logo.png"
          {...genarateSize()}
          alt="logo"
        />
      </Button>
    </Link>
  );
};

export default Logo;
