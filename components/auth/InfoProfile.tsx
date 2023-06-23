"use client";

import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import React from "react";

interface Props {
  session?: Session;
}

const InfoProfile = ({ session }: Props) => {
  const { data } = useSession();
  return (
    <figcaption className="mr-2">
      <h5 className="font-semibold text-lg">
        {session?.user.name || data?.user?.name}
      </h5>
      <p className="flex gap-2">
        <b>ایمیل:</b> {session?.user.email || data?.user?.email} | <b>عضویت:</b>
        {session?.user.createdAt?.substring(0, 10) ||
          data?.user?.createdAt?.substring(0, 10)}
      </p>
    </figcaption>
  );
};

export default InfoProfile;
