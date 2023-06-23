import React from "react";
import Link from "next/link";

export interface IBreadCrumbs {
  name: string;
  url: string;
}

const BreadCrumbs = ({ breadCrumbs }: { breadCrumbs: Array<IBreadCrumbs> }) => {
  return (
    <section dir="rtl" className="py-5 sm:py-7 bg-blue-100">
      <div className="container max-w-screen-xl mx-auto px-4">
        <ol className="inline-flex flex-wrap text-gray-600 space-x-1 md:gap-4 items-center">
          {breadCrumbs?.map((breadCrumb: any, index: number) => (
            <li key={breadCrumb.url} className="inline-flex  items-center">
              <Link
                href={breadCrumb.url}
                className="text-gray-600 hover:text-blue-600"
              >
                {breadCrumb.name}
              </Link>
              {breadCrumbs?.length - 1 !== index && (
                <i className="mr-3 text-gray-400 fa fa-chevron-left"></i>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default BreadCrumbs;
