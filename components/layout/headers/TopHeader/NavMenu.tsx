import React, { FC } from "react";
import { INavMenuItem, NavMenuItem } from "./NavMenuItem";

export interface INavMenu {
    navList:Array<INavMenuItem>
}

const NavMenu:FC<INavMenu> = ({navList}) => {
  return (
    <nav>
      <ul className=" text-white flex gap-4 items-center ">
        {navList.map((item) => (
          <NavMenuItem key={item.label} label={item.label} path={item.path} />
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;
