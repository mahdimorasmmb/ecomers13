'use client'

import React, { FC } from "react";
import Filters from "../layout/Filters";
import ProductItem from "./ProductItem";

interface Props {
  data: any
}

const ListProducts: FC<Props> = ({ data }) => {
  console.log(data);

  return    <section className="py-12">
  <div className="container max-w-screen-xl mx-auto px-4">
    <div className="flex flex-col md:flex-row-reverse -mx-4">
      <Filters />

      <main className="md:w-2/3 lg:w-3/4 px-3">
        {data?.products?.map((product:any) => (
          <ProductItem key={product?._id} product={product} />
        ))}
      </main>
    </div>
  </div>
</section>;
};

export default ListProducts;
