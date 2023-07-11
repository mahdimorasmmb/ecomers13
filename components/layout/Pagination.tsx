'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { FC } from "react";

interface Props {
  resPerPage: number;
  itemsCount: number;
}

const Pagination: FC<Props> = ({ itemsCount, resPerPage }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  let page = searchParams.get("page") || 1;
  page = Number(page);

  const totalPages = Math.ceil(itemsCount / resPerPage);

  const queryString = new URLSearchParams({ ...searchParams }.toString());
  const handlePageChange = (selectedPage: number) => {
    if (searchParams.has("page")) {
      queryString.set("page", String(selectedPage));
    } else {
      queryString.append("page", String(selectedPage));
    }

    router.push(`${pathname}?${queryString.toString()}`);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          className={`btn text-white border-gray-500 border hover:bg-blue-700 bg-blue-600${i === page ? "btn-active bg-blue-700" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="flex mt-10 justify-center">
      <div className="btn-group ">{renderPaginationButtons()}</div>
    </div>
  );
};

export default Pagination;
