import React from "react";
import Logo from "./Logo";
import Search from "./Search";
import Container from "@/components/Container";
import Navigation from "./Navigation";
import Header from "./MobileNav";

const MiddleHeader = () => {
  return (
    <div dir="rtl" className=" flex items-center justify-center h-28  bg-white">
      <Container className="flex justify-between md:px-4 "  >
        <Logo />
        <Search />
        <Navigation/>
        {/* <Header/>    mobile nav */}
      </Container>
    </div>
  );
};
export default MiddleHeader;
