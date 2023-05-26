import React from "react";
import Button from "../Button";

export const Search = () => {
  return (
    <form className="flex flex-nowrap gap-2 items-center w-full order-last md:order-none mt-5 md:mt-0 md:w-2/4 lg:w-2/4">
      <input
        className="flex-grow appearance-none border border-gray-200 bg-gray-100 rounded-md mr-2 py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400"
        type="text"
        placeholder="
      محصول  مورد نظرتان را جستجو کنید ..."
        required
      />
      <Button label="جستوجو" />
    </form>
  );
};
