"use client";

import React, { FC, useState } from "react";
import SquaresPlusIcon from "@heroicons/react/24/outline/SquaresPlusIcon";
import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import { TypeCategory } from "../MiddleHeader/SelectCategory";
import Link from "next/link";

interface Props {
  listCategories: TypeCategory[];
}

const CategoryDropdown: FC<Props> = ({ listCategories }) => {
  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn flex justify-between rounded-3xl m-1 btn-primary w-[280px]">
     <span className="flex items-center gap-2">   <SquaresPlusIcon className="text-gray-200 h-6 w-6" /> همه دسته بندی ها{" "}</span>
        <ChevronDownIcon className="text-gray-200 h-6 w-6" />
      </label>
      <ul
        tabIndex={0}
        className={`dropdown-content  z-[1] menu p-2 shadow bg-base-100 rounded-box w-52  `}
      >
        {listCategories.map((item) => (
          <li key={item.value}>
            <Link href={"#"}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryDropdown;
