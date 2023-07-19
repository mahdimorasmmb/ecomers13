"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormInput from "../FormInput";
import Select from "../Select";
import Button from "../Button";
import { useMutation } from "@tanstack/react-query";

const roleList = [
  {
    value: "disabled",
    label: "دسترسی خود را اتخاب کتید",
  },
  {
    value: "user",
    label: "کاربر",
  },
  {
    value: "admin",
    label: "مدیر",
  },
];

const UpdateUser = ({ user }: { user: any }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      ...user,
    },
  });
  const mutation = useMutation({
    mutationFn: (userData) => axios.put(`/api/users/${user._id}`, userData),
    onSuccess(data, variables, context) {
      toast.success(data.data.message);
      router.refresh();
      router.replace("/admin/users");
    },
    onError(error, variables, context) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    },
  });
  const router = useRouter();
  const submitHandler = async (value: any) => {
    console.log(value);

    mutation.mutate(value);
  };

  return (
    <div
      dir="rtl"
      style={{ maxWidth: "480px" }}
      className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white"
    >
      <form onSubmit={handleSubmit(submitHandler)}>
        <h2 className="mb-5 text-2xl font-semibold">به روز رسانی کاربر</h2>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <FormInput
              warperClassName="mb-4"
              label="نام و نام خانوادگی"
              required
              placeholder="نامتان را بنویسید"
              {...field}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <FormInput
              warperClassName="mt-2"
              {...field}
              label="پست الکترونیک"
              placeholder="ایمیل خود را تایپ کنید"
              required
            />
          )}
        />

        <div dir="" className="mb-4">
          <label className="block mb-1"> نقش </label>

          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <Select
                required
                disabledOption={0}
                className=""
                options={roleList}
                {...field}
              />
            )}
          />
        </div>

        <Button
          isLoding={mutation.isLoading}
          type="submit"
          className="w-full justify-center "
          label="به روز رسانی"
        />
      </form>
    </div>
  );
};

export default UpdateUser;
