'use client'

import { useSession } from "next-auth/react";
import React from "react";

interface Props {
  imageSrc?: string;
  alt?: string;
}

const Avatar = ({ imageSrc, alt }: Props) => {
  const { data } = useSession();
  return (
    <img
      className="w-16 h-16 rounded-full mr-4"
      src={imageSrc || data?.user?.avatar?.url || "/images/default.png "}
      alt={alt || data?.user?.name || "profile"}
    />
  );
};

export default Avatar;
