import Link from "next/link";
import React, { FC } from "react";
import NavMenu from "./NavMenu";
import Container from "@/components/Container";
import ContactNav from "./ContactNav";

const list = [
  {
    label: "پرسش و پاسخ",
    path: "#",
  },
  {
    label: "تماس با ما",
    path: "#",
  },
  {
    label: "درباره ما",
    path: "#",
  },
];

const TopHeader = () => {
  return (
    <nav
      dir="rtl"
      className="flex py-2  justify-center   bg-primary"
    >
      <Container className="flex justify-between px-6">
        <NavMenu navList={list} />
        <ContactNav />
      </Container>
    </nav>
  );
};

export default TopHeader;
