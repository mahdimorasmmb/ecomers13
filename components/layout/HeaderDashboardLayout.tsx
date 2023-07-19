"use client";

import { useSession } from "next-auth/react";
import React from "react";

const HeaderDashboardLayout = () => {
  const session = useSession();
  return (
    <section dir="rtl" className="py-5 sm:py-3 bg-blue-100">
      <div className="container max-w-screen-xl mx-auto px-4">
        <h1 className="text-bold text-2xl">
          {session.data?.user.role === "admin"
            ? "داشبورد ادمین"
            : "داشبورد کاربر"}
        </h1>
      </div>
    </section>
  );
};

export default HeaderDashboardLayout;
