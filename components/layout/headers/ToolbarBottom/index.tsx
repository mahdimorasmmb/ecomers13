import React from "react";
import CategoryDropdown from "./CategoryDropdown";
import Container from "@/components/Container";
import HoverDropdown from "@/components/HoverDropdown";
import Link from "next/link";
import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";

const listCategories = [
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

const navigations = [
  {
    label: "فروشگاه",
    path: "/",
  },
  {
    label: "اخبار",
    path: "/news",
  },
  {
    label: "تماس با ما ",
    path: "/contact-us",
  },
  {
    label: "درباره ما ",
    path: "/about-me",
  },
];

const ToolbarBottom = () => {
  return (
    <div
      dir="rtl"
      className="flex justify-center bg-white py-2 border-t  border-gray-100 "
    >
      <Container className="flex justify-between ">
        <div className="flex gap-8">
          {" "}
          <CategoryDropdown listCategories={listCategories} />
          <HoverDropdown
            hoverButton={
              <button className="   flex flex-row-reverse gap-2 items-center no-underline text-gray-700 hover:text-primary  text-base font-bold ">
                <ChevronDownIcon className=" h-5 w-5 hover:text-primary transition-all " />
                <span>دسته بندی ها </span>
              </button>
            }
            contentDropDown={
              <div className=" flex w-[900px] px-5 ">
                <ul className=" w-full  grid grid-cols-2 ">
                  {listCategories.map((item) => (
                    <li key={item.value}>
                      <Link
                        className="cursor-pointer hover:text-gray-400"
                        href={item.value}
                      >
                        {" "}
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className=" w-full grid grid-cols-2 ">
                  {listCategories.map((item) => (
                    <li key={item.value}>
                      <Link
                        className="cursor-pointer hover:text-gray-400"
                        href={item.value}
                      >
                        {" "}
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            }
          />
          <ul className="flex items-center gap-8">
            {navigations.map((item) => {
              if (item.path) {
                return (
                  <li
                    className="hover:text-primary text-base font-bold"
                    key={item.label.toString()}
                  >
                    <Link href={item.path}>{item.label}</Link>
                  </li>
                );
              }
              return <li key={item.label.toString()}>{item.label}</li>;
            })}
          </ul>
        </div>
        <div></div>
      </Container>
    </div>
  );
};

export default ToolbarBottom;
