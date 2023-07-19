import UploadImages from "@/components/admin/UploadImages";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  return <UploadImages id={params.id} />;
};

export default Page;
