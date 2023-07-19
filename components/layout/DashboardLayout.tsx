import Sidebar from "@/components/layout/Sidebar";
import React from "react";
import HeaderDashboardLayout from "./HeaderDashboardLayout";

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <HeaderDashboardLayout />
      <section className="py-5">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-end ">
            <main className="md:w-2/3 lg:w-3/4 px-4">
              <article>{children}</article>
            </main>
            <Sidebar />
          </div>
        </div>
      </section>
    </>
  );
}
