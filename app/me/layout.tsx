import UserLayout from "@/components/layout/DashboardLayout";
import React from "react";

export default function Layout({ children }: React.PropsWithChildren) {
  return <UserLayout>{children}</UserLayout>;
}
