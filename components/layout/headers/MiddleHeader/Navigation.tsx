import React from "react";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import HeartIcon from "@heroicons/react/24/outline/HeartIcon";
import ShoppingBagIcon from "@heroicons/react/24/outline/ShoppingBagIcon";
import Link from "next/link";

type Props = {};

const list = [
  {
    label: "حساب کاربری",
    icon: <UserIcon className="h-6 w-6" />,
    path: "/login",
  },
  {
    label: "علاقمندی ها",
    path: "#",
    icon: <HeartIcon className="h-6 w-6" />,
  },
  {
    label: "سبد خرید",
    path: "/shipping",
    icon: <ShoppingBagIcon className="h-6 w-6" />,
  },
];

const Navigation = (props: Props) => {
  return (
    <ul className="flex items-center gap-5">
      {list.map((item) => (
        <li className=" " key={item.path}>
          <Link
            className="flex flex-col items-center gap-1 hover:text-primary transition-colors"
            href={item.path}
          >
            <span className="relative flex">
              <span className="absolute flex items-center justify-center bg-opacity-70 -right-2 -top-3 rounded-full bg-primary w-5 h-5  p-0 m-0 text-white font-mono text-sm  leading-tight text-center">
                5
              </span>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
