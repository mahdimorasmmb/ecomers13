import React, { FC } from "react";
import Filters from "../layout/Filters";
import ProductItem from "./ProductItem";
import Pagination from "../layout/Pagination";
import { ProductDataResponse } from "@/app/page";

interface Props {
  data: ProductDataResponse;
}

const ListProducts: FC<Props> = ({ data }) => {
  return (
    <section className="py-12">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row-reverse -mx-4">
          <Filters />

          <main className="md:w-2/3 lg:w-3/4 px-3">
            {data?.products?.map((product) => (
              <ProductItem key={product?._id} product={product} />
            ))}
            <Pagination
              itemsCount={data.filteredProductsCount}
              resPerPage={data.resPerPage}
            />
          </main>
        </div>
      </div>
    </section>
  );
};

export default ListProducts;
