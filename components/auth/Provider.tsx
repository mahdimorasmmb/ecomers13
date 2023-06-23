"use client";

import { SessionProvider } from "next-auth/react";
import React, { FC } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
interface Props {
  children: React.ReactNode;
}

const Provider: FC<Props> = ({ children }) => {
  return (
    <SessionProvider>
      {children}
      <ToastContainer />
    </SessionProvider>
  );
};

export default Provider;
