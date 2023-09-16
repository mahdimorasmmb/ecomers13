"use client";

import React from "react";
import TopHeader from "./TopHeader/TopHeader";
import MiddleHeader from "./MiddleHeader/MiddleHeader";
import ToolbarBottom from "./ToolbarBottom";
import MobileHeader from "./mobile-header";

const Headers = () => {
  return (
    <>
      <header className=" hidden md:flex flex-col">
        <TopHeader />
        <MiddleHeader />
        <ToolbarBottom />
      </header>
      <MobileHeader />
    </>
  );
};

export default Headers;
