'use client'

import React, { useState } from "react";
import Button from "../Button";
import { FormEvent } from "react";
import { usePathname, useRouter } from "next/navigation";

export const Search = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [keyword, setKeyword] = useState<string>();

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (keyword) {
      router.push(`${pathname}?name=${keyword}`);
    } else {
      const clienPathname = pathname.split("?")[0];
      router.push(clienPathname);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-nowrap gap-2 items-center w-full order-last md:order-none mt-5 md:mt-0 md:w-2/4 lg:w-2/4"
    >
      <input
        className="flex-grow appearance-none border border-gray-200 bg-gray-100 rounded-md mr-2 py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400"
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="
      محصول  مورد نظرتان را جستجو کنید ..."
      />
      <Button >
      جستوجو
      </Button>
    </form>
  );
};
