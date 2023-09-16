"use client";
import Link from "next/link";
import React, { FC, useState } from "react";

interface Props {
  hoverButton: React.ReactElement;
  contentDropDown: React.ReactElement;
}

const HoverDropdown: FC<Props> = ({ hoverButton, contentDropDown }) => {
  const [open, setOpen] = useState(false);

  return (
    <div onMouseLeave={() => setOpen(false)} className="dropdown items-center flex ">
      {React.cloneElement(hoverButton, {
        onMouseOver: () => {
          setOpen(true);          
        },
        className:`${hoverButton.props.className} ${open && '[&>*:first-child]:rotate-180'}`
      })}

      {/* <button ></button> */}
      <div
        className={`dropdown-content top-12  z-[1] menu p-2 shadow bg-base-100 rounded-box    ${
          open ? "!visible !opacity-100 " : ""
        }`}
      >
        {contentDropDown}
      </div>
    </div>
  );
};

export default HoverDropdown;
