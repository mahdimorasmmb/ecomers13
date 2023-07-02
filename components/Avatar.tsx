"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

interface Props {
  imageSrc?: string;
  alt?: string;
}

const Avatar = ({ imageSrc, alt }: Props) => {
  const { data } = useSession();

  const src =
    typeof window === "undefined" ? imageSrc : data?.user?.avatar?.url;

  return (
    <Image
      className=" rounded-full mr-4"
      src={src || "/images/default.png "}
      alt={alt || data?.user?.name || "profile"}
      width={64}
      height={64}
    />
  );
};

export default Avatar;
