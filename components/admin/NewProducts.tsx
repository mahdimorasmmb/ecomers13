"use client";

import axios from "axios";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import FormInput from "../FormInput";
import FormItem from "../FormItem";
import Select from "../Select";
import Button from "../Button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const categories = [
  "Electronics",
  "Cameras",
  "Laptops",
  "Accessories",
  "Headphones",
  "Sports",
];

const categoriesList = Object.values(categories).map((cat) => ({
  value: cat,
  label: cat,
}));

const NewProduct = ({ product }: { product?: Product }) => {
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    defaultValues: product,
  });

  const submitHandler = async (value: any) => {
    if (product) {
      const res = await axios.put(`/api/products/${product._id}`, value);

      if (res.status === 201) {
        toast.success(res.data.message);
        router.refresh();
        router.replace("/admin/products");
      }
    } else {
      const res = await axios.post("/api/products", value);

      if (res.status === 201) {
        toast.success(res.data.message);
        router.refresh();
        router.replace("/admin/products");
      }
    }
  };

  return (
    <section dir="rtl" className="container max-w-3xl p-6 mx-auto">
      <h1 className=" text-xl md:text-3xl font-semibold text-black mb-8">
        ایجاد محصول جدید
      </h1>

      <form onSubmit={handleSubmit(submitHandler)}>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <FormInput
              warperClassName="mb-4"
              label="نام"
              required
              placeholder="نام محصول"
              {...field}
            />
          )}
        />
        <FormItem warperClassName="mb-4" label="شرح">
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <textarea
                rows={4}
                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                placeholder="توضیحات محصول"
                required
                {...field}
              />
            )}
          />
        </FormItem>

        <div className="grid md:grid-cols-2 gap-x-2 mt-5">
          <Controller
            control={control}
            name="price"
            render={({ field }) => (
              <FormInput
                warperClassName="mb-4"
                label="قیمت"
                required
                placeholder="0.00"
                {...field}
              />
            )}
          />
          <FormItem label="دسته بندی">
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select options={categoriesList} {...field} />
              )}
            />
          </FormItem>
          <i className="absolute inset-y-0 right-0 p-2 text-gray-400">
            <svg
              width="22"
              height="22"
              className="fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M7 10l5 5 5-5H7z"></path>
            </svg>
          </i>
        </div>

        <div className="grid md:grid-cols-2 gap-x-2 mt-5">
          <Controller
            control={control}
            name="seller"
            render={({ field }) => (
              <FormInput
                warperClassName="mb-4"
                label="فروشنده / برند"
                required
                placeholder="فروشنده یا برند"
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name="stock"
            render={({ field }) => (
              <FormInput
                warperClassName="mb-4"
                label="موجودی"
                required
                placeholder="0"
                {...field}
              />
            )}
          />
        </div>
        <Button className="w-full" type="submit">
          ایجاد محصول
        </Button>
      </form>
    </section>
  );
};

export default NewProduct;
