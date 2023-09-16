"use client";
import React, { FormEvent, useState } from "react";

import SearchResultModal from "./SearchResultModal";
import useFocusStatus from "@/tools/useFocusStatus";
import SelectCategory from "./SelectCategory";
import SearchInput from "./SearchInput";
import { Controller, useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";

const listCategory = [
  {
    value: "all",
    label: "همه دسته بندی ها",
  },
  {
    value: "Electronics",
    label: "الکترونیک",
  },
  {
    value: "Laptops",
    label: "لپ تاپ ها",
  },
  {
    value: "Toys",
    label: "اسباب بازی",
  },
  {
    value: "Office",
    label: "دفتر",
  },
  {
    value: "Beauty",
    label: "محصولات زیبایی ",
  },
];

const Search = () => {
  const { isFocused, inputRef } = useFocusStatus();
  const { control, handleSubmit, watch } = useForm();
  const router = useRouter();
  const pathname = usePathname();

  const submitHandler = (value: any) => {
    const category = value.category;

    let url = `${pathname}?`;
    if (value.search_word) {
      url = `${url}name=${value.search_word}`;
    }
    if (category !== "all") {
      url = `${url}&category=${category}`;
    }
    router.push(url);
  };

  return (
    <div className="flex w-1/2 flex-col">
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="flex  justify-between  items-center bg-[#f5f8fb] rounded-full ">
          <div className="flex flex-1 ">
            {/* <Select options={listCategory}/> */}
            <Controller
              defaultValue={listCategory[0].value}
              name="category"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SelectCategory
                  options={listCategory}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            <div className="divider divider-horizontal m-0"></div>
            <Controller
              name="search_word"
              control={control}
              render={({ field }) => (
                <SearchInput
                  type="text"
                  placeholder="جستجو..."
                  {...field}
                  ref={inputRef}
                />
              )}
            />
          </div>
          <button
            type="submit"
            className=" btn    btn-primary text-gray-100 rounded-l-full h-full "
          >
            جستجو
          </button>
        </div>
      </form>
      <SearchResultModal
        isActive={isFocused}
        searchWord={watch("search_word")}
        category={watch('category')}
      />
    </div>
  );
};

export default Search;
