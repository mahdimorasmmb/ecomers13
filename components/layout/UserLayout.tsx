import Sidebar from "@/components/layout/Sidebar";
import React from "react";

export default function UserLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <section dir="rtl" className="py-5 sm:py-3 bg-blue-100">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h1 className="text-bold text-2xl">داشبورد کاربر</h1>
        </div>
      </section>

      <section className="py-5">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-end ">
           
            <main className="md:w-2/3 lg:w-3/4 px-4">
              <article >
                {children}
              </article>
            </main>
            <Sidebar />
          </div>
        </div>
      </section>
    </>
  );
}
