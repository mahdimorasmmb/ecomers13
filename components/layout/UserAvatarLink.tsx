"use client";
import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { getSession, useSession } from "next-auth/react";
import { Session } from "next-auth";

interface Props {
  session: Session | null;
}

const UserAvatarLink: FC<Props> = ({ session }) => {
  const clientSession = useSession();
  const user = session ? session.user : clientSession?.data?.user;
  return (
    <>
      {user ? (
        <Link href="/me">
          <div className="flex gap-4 items-center mb-4 space-x-3 mt-4 cursor-pointer">
            <Image
              height={40}
              width={40}
              alt={user.name}
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
          <span className="hidden lg:inline ml-1">وارد شدن</span>
        </Link>
      )}
    </>
  );
};

export default UserAvatarLink;
