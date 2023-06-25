"use client";

import React, { useState, useContext } from "react";

import { Country, countries } from "countries-list";
import FormInput from "../FormInput";
import Select, { Option } from "../Select";
import Button from "../Button";
import { useForm, Controller } from "react-hook-form";
import { postData } from "@/tools/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import FormItem from "../FormItem";

interface Props {
  address?: Address;
}

const countriesList = Object.values(countries).map((country) => ({
  value: country.name,
  label: country.name,
}));

const NewAddress = ({ address }: Props) => {
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    defaultValues: address,
  });

  const submitHandler = async (value: any) => {
    if (address) {
      const res = await fetch(
        `${process.env.API_URL}/api/address/${address._id}`,
        {
          method: "PATCH",
          body: JSON.stringify(value),
        }
      );

      const data = await res.json();

      if (!res.ok) return toast.error(data.message);

      toast.success(data.message);

      router.refresh();
    } else {
      const res = await fetch(`${process.env.API_URL}/api/address`, {
        method: "POST",
        body: JSON.stringify(value),
      });

      const data = await res.json();

      if (!res.ok) return toast.error(data.message);

      toast.success(data.message);

      router.push("/me");
    }
  };

  const handleDeletedAddress = async () => {
    const res = await fetch(
      `${process.env.API_URL}/api/address/${address?._id}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    if (!res.ok) return toast.error(data.message);

    toast.success(data.message);

    router.replace("/me");
  };

  return (
    <div
      dir="rtl"
      style={{ maxWidth: "480px" }}
      className=" mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
    >
      <form onSubmit={handleSubmit(submitHandler)}>
        {address ? (
          <h2 className="mb-5 text-2xl font-semibold">ویرایش آدرس </h2>
        ) : (
          <h2 className="mb-5 text-2xl font-semibold">افزودن آدرس جدید</h2>
        )}

        <div className="flex flex-col gap-2">
          <Controller
            name="street"
            control={control}
            render={({ field }) => (
              <FormInput
                {...field}
                label="خیابان"
                placeholder="آدرس خود را تایپ کنید"
              />
            )}
          />

          <div className="flex gap-4 ">
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <FormInput
                  warperClassName="flex-1"
                  {...field}
                  label="شهر"
                  placeholder="شهر خود را تایپ کنید"
                />
              )}
            />
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <FormInput
                  warperClassName="flex-1"
                  {...field}
                  label="استان"
                  placeholder="استان را در اینجا تایپ کنید"
                />
              )}
            />
          </div>
          <Controller
            name="zipCode"
            control={control}
            render={({ field }) => (
              <FormInput
                {...field}
                label="کد پستی "
                placeholder="کد پستی را اینجا تایپ کنید"
              />
            )}
          />
          <Controller
            name="phoneNo"
            control={control}
            render={({ field }) => (
              <FormInput
                {...field}
                label=" شماره تلفن "
                placeholder="شماره تلفن را در اینجا تایپ کنید"
              />
            )}
          />

          <FormItem label="کشور">
            <Controller
              name={"country"}
              control={control}
              render={({ field }) => (
                <Select {...field} options={countriesList || []} />
              )}
            />
          </FormItem>
        </div>
        <div className="flex gap-4">
          {address && (
            <Button
              type="button"
              className="w-full bg-red-500 hover:bg-red-800 mt-5"
              onClick={handleDeletedAddress}
              label="حذف کردن"
            />
          )}
          <Button
            className="w-full mt-5"
            type="submit"
            label={address ? "ویرایش کردن" : " اضافه کردن"}
          />
        </div>
      </form>
    </div>
  );
};

export default NewAddress;
