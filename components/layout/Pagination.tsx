import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { FC } from "react";

interface Props {
  resPerPage: number;
  productCount: number;
}

const Pagination: FC<Props> = ({ productCount, resPerPage }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  let page = searchParams.get("page") || 1;
  page = Number(page);

  const totalPages = Math.ceil(productCount / resPerPage);

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
          className={`btn ${i === page ? "btn-active" : ""}`}
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
      <div className="btn-group">{renderPaginationButtons()}</div>
    </div>
  );
};

export default Pagination;
