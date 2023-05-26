"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import StarRatings from "react-star-ratings";

const Filters = () => {
  const router = useSearchParams()
  let queryParams:URLSearchParams
 
  

  function checkHandler(checkBoxType:any, checkBoxValue:any) {
    
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(router.get('search') as string );
    }

    if (typeof window !== "undefined") {
      const value = queryParams.get(checkBoxType);
      if (checkBoxValue === value) return true;
      return false;
    }
  }

  return (
    <aside dir="rtl" className="md:w-1/3 lg:w-1/4 px-4">
      <a
        className="md:hidden mb-5  w-full text-center px-4 py-2 inline-block text-lg text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
        href="#"
      >
        Filter by
      </a>
      <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
        <h3 className="font-semibold mb-2">قیمت</h3>
        <div className="grid md:grid-cols-3 gap-x-2">
          <div className="mb-4">
            <input
              name="min"
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-2 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="number"
              placeholder="حداقل"
            />
          </div>

          <div className="mb-4">
            <input
              name="max"
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-2 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="number"
              placeholder="حداکثر"
            />
          </div>

          <div className="mb-4">
            <button className="px-1 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
              بگرد
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
        <h3 className="font-semibold mb-2">دسته بندی</h3>

        <ul className="space-y-1">
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Electronics"
                className="h-4 w-4"
                defaultChecked={checkHandler("category", "Electronics")}
              />
              <span className="mr-2 text-gray-500"> الکترونیک </span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Laptops"
                className="h-4 w-4"
                defaultChecked={checkHandler("category", "Laptops")}
              />
              <span className="mr-2 text-gray-500"> لپ تاپ ها </span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Toys"
                className="h-4 w-4"
                defaultChecked={checkHandler("category", "Toys")}
              />
              <span className="mr-2 text-gray-500"> اسباب بازی </span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Office"
                className="h-4 w-4"
                defaultChecked={checkHandler("category", "Office")}
              />
              <span className="mr-2 text-gray-500"> دفتر </span>
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input
                name="category"
                type="checkbox"
                value="Beauty"
                className="h-4 w-4"
                defaultChecked={checkHandler("category", "Beauty")}
              />
              <span className="mr-2 text-gray-500"> محصولات زیبایی </span>
            </label>
          </li>
        </ul>

        <hr className="my-4" />

        <h3 className="font-semibold mb-2">رتبه بندی</h3>
        <ul className="space-y-1">
          <li>
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center">
                <input
                  name="ratings"
                  type="checkbox"
                  value={rating}
                  className="h-4 w-4"
                  defaultChecked={checkHandler("ratings", `${rating}`)}
                />
                <span className="ml-2 text-gray-500">
                  {" "}
                  <StarRatings
                    rating={rating}
                    starRatedColor="#ffb829"
                    numberOfStars={rating}
                    starDimension="20px"
                    starSpacing="2px"
                    name="rating"
                  />{" "}
                </span>
              </label>
            ))}
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Filters;