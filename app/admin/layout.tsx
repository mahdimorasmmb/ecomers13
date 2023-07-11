import UserLayout from "@/components/layout/UserLayout";
import React from "react";

export default function Layout({ children }: React.PropsWithChildren) {
  return <UserLayout>{children}</UserLayout>;
}
