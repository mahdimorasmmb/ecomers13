"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import StarRatings from "react-star-ratings";
import Input from "../Input";
import Button from "../Button";
import { toast } from "react-toastify";

const checkboxes = [
  {
    name: "category",
    value: "Electronics",
    label: "الکترونیک",
  },
  {
    name: "category",
    value: "Laptops",
    label: "لپ تاپ ها",
  },
  {
    name: "category",
    value: "Toys",
    label: "اسباب بازی",
  },
  {
    name: "category",
    value: "Office",
    label: "دفتر",
  },
  {
    name: "category",
    value: "Beauty",
    label: "محصولات زیبایی ",
  },
];

const Filters = () => {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [valueCheckbox, setvalueCheckbox] = useState<{
    [key: string]: string | number;
  }>({});
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let queryParams = new URLSearchParams(searchParams.toString());

  function handleClick(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value
    const newValue = { [name]: value };

    setvalueCheckbox((prev) => {
      if (prev[name] === newValue[name]) {
        return { ...prev, [name]: "" };
      }
      return { ...prev, ...newValue };
    });
    if (queryParams.get(name) === newValue[name]) {
      queryParams.delete(name);

      return router.push(`${pathname}?${queryParams.toString()}`);
    }
    queryParams.set(name, String(newValue[name]));
    return router.push(`${pathname}?${queryParams.toString()}`);
  }

  function handleButton() {
    if (max && min) {
      queryParams.set("min", String(min));
      queryParams.set("max", String(max));
      router.push(`${pathname}?${queryParams.toString()}`);
    } else {
      toast.error("مفداری حداقل و حداکثر را وارد کنید ");
    }
  }

  useEffect(() => {
    queryParams.forEach((value, key) => {
      setvalueCheckbox((prev) => ({ ...prev, [key]: value }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <aside dir="rtl" className="md:w-1/3 lg:w-1/4 px-4">
      {/* {'dropdown mobile'} */}
      <a
        className="md:hidden mb-5  w-full text-center px-4 py-2 inline-block text-lg text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
        href="#"
      >
        Filter by
      </a>
      <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
        <h3 className="font-semibold mb-2">قیمت</h3>
        <div className="grid md:grid-cols-3 gap-x-2">
          <Input
            className="mb-4 !px-2 "
            name="min"
            placeholder="حداقل"
            onChange={(e) => setMin(e.target.value)}
          />

          <Input
            name="max"
            className="mb-4 !px-2 "
            placeholder="حداکثر"
            onChange={(e) => setMax(e.target.value)}
          />

          <Button className="mb-4" label="بگرد" onClick={handleButton} />
        </div>
      </div>

      <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
        <h3 className="font-semibold mb-2">دسته بندی</h3>

        <ul className="space-y-1">
          {checkboxes.map((item) => (
            <li key={item.label}>
              <label className="flex items-center">
                <input
                  name={item.name}
                  type="checkbox"
                  checked={item.value === valueCheckbox[item.name]}
                  value={item.value}
                  className="h-4 w-4"
                  onChange={handleClick}
                />
                <span className="mr-2 text-gray-500"> {item.label} </span>
              </label>
            </li>
          ))}
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
                  checked={rating === Number(valueCheckbox["ratings"])}
                  className="h-4 w-4"
                  onChange={handleClick}
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
