import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import StarRatings from "react-star-ratings";

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
    const newValue = { [name]: e.target.value };
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
    queryParams.set(name, newValue[name]);
    return router.push(`${pathname}?${queryParams.toString()}`);
  }

  function handleButton() {
    queryParams.set("min", String(min));
    queryParams.set("max", String(max));
    router.push(`${pathname}?${queryParams.toString()}`);
    console.log(queryParams.toString());
    
  }

  useLayoutEffect(() => {
    const value = queryParams.values();
    console.log(value);

    // value && setvalueCheckbox(value);
  }, []);

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
              onChange={(e) => setMin(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <input
              name="max"
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-2 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="number"
              placeholder="حداکثر"
              onChange={(e) => setMax(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <button
              onClick={handleButton}
              className="px-1 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              بگرد
            </button>
          </div>
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
                  // defaultChecked={item.value === valueCheckbox}
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
                  checked={rating === valueCheckbox["ratings"]}
                  className="h-4 w-4"
                  onChange={handleClick}
                  // defaultChecked={checkHandler("ratings", `${rating}`)}
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
