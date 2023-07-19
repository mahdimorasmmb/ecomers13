'use client'

import React from "react";
import Link from "next/link";
import Pagination from "../layout/Pagination";
import { ProductDataResponse } from "@/app/admin/products/page";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Products = ({ data }: { data: ProductDataResponse }) => {
  const router = useRouter();

  const deleteHandle = async (id: string) => {
    const res = await axios.delete(`/api/products/${id}`);

    if (res.status === 200) {
      toast.success(res.data.message);
      router.refresh();
      router.replace("/admin/products");
    }
  };
  return (
    <div dir="rtl" className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-3xl my-5 mr-4 font-bold">
        محصولات {data?.productsCount}
      </h1>
      <table className="w-full text-sm text-right">
        <thead className="text-l text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              نام
            </th>
            <th scope="col" className="px-6 py-3">
              موجودی
            </th>
            <th scope="col" className="px-6 py-3">
              قیمت
            </th>
            <th scope="col" className="px-6 py-3">
              اقدامات
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.products?.map((product: Product) => (
            <tr key={product._id} className="bg-white">
              <td className="px-6 py-2">{product?.name}</td>
              <td className="px-6 py-2">{product?.stock}</td>
              <td className="px-6 py-2">${product?.price}</td>
              <td className="px-6 py-2">
                <div>
                  <Link
                    href={`/admin/products/${product._id}/upload_images`}
                    className="px-2 py-2 inline-block text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                  >
                    <i className="fa fa-image" aria-hidden="true"></i>
                  </Link>

                  <Link
                    href={`/admin/products/${product._id}`}
                    className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                  >
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </Link>
                  <a
                    onClick={() => deleteHandle(product._id)}
                    className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div dir="ltr" className="mb-6">
        <Pagination
          resPerPage={data?.resPerPage}
          itemsCount={data?.filteredProductsCount}
        />
      </div>
    </div>
  );
};

export default Products;
