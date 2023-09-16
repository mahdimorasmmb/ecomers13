import getQueryStrings from "@/tools/getQueryStrings";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import React, { FC } from "react";
import { UseFormWatch } from "react-hook-form";

interface Props {
  searchWord: string;
  isActive: boolean;
  category: string;
}

const SearchResultModal: FC<Props> = ({ searchWord, isActive, category }) => {
  const { isLoading, isFetching, data } = useQuery({
    queryFn: async (word) => {
      const url = {
        name: word.queryKey[1],
        category: word.queryKey[2] === "all" ? "" : word.queryKey[2],
      };

      const queryString = getQueryStrings(url);
      return await axios.get(`/api/products/search?${queryString}`);
    },
    queryKey: ["searcResult", searchWord, category],
    enabled: Boolean(searchWord),
  });

  const renderUiResult = () => {
    if (isLoading && isFetching)
      return (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      );
    else if (data?.data.products.length)
      return (
        <ul className="flex flex-col gap-5">
          {data?.data.products.map((item: any) => (
            <li key={item._id} className="flex">
              {" "}
              <Image
                src={item.images[0].url}
                width={40}
                height={40}
                alt="product"
              />
              <div className="flex flex-col">
                <p>{item.name}</p>
                <div className="flex gap-2">
                  <a href="https://sao-wp.ir/shopit/product-category/cat_4/">
                    دوربین فیلم برداری
                  </a>
                  <a href="https://sao-wp.ir/shopit/product-category/cat_10/">
                    ساعت دیجیتال
                  </a>
                  <a href="https://sao-wp.ir/shopit/product-category/cat_7/">
                    موس و کیبورد
                  </a>
                  <a href="https://sao-wp.ir/shopit/product-category/cat_1/">
                    هدست و هدفون
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      );
    else if (!data?.data.products.length)
      return (
        <div className="flex justify-center">
          <p>هیج نتیجه ای یافت نشد</p>
        </div>
      );
  };

  return (
    <div
      className={`  ${
        isActive && Boolean(searchWord) && "!inline-block"
      } hidden w-full relative  `}
    >
      <div className=" shadow-[0_0_5px_0px_rgba(0,10,20,0.10)] border bg-white rounded-2xl p-3 absolute w-full top-2 ">
        {renderUiResult()}
      </div>
    </div>
  );
};

export default SearchResultModal;
