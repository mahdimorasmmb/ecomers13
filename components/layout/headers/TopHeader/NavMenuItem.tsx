import Link from "next/link";
import { FC } from "react";

export interface INavMenuItem {
  path: string;
  label: string;
}

export const NavMenuItem: FC<INavMenuItem> = ({ label, path }) => {
  return (
    <li>
      <Link
        className="text-gray-100 hover:text-gray-300 transition-colors text-sm "
        href={path}
      >
        {label}
      </Link>
    </li>
  );
};
