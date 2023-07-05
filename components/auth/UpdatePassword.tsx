"use client";

import React, { useContext, useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormInput from "../FormInput";
import Button from "../Button";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const UpdatePassword = () => {
  const { control, handleSubmit } = useForm();
  const router = useRouter();

  const submitHandler = async (value: any) => {
    try {
      const res = await axios.post(`/api/user/update_password`, { ...value });

      toast.success(res.data.message);
      router.refresh();
      router.push("/me");
    } catch (error) {
      if (error instanceof AxiosError) {
        return toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <>
      <div
        dir="rtl"
        style={{ maxWidth: "480px" }}
        className="mt-5 mb-20 p-4 md:p-7 mx-auto rounded bg-white"
      >
        <form onSubmit={handleSubmit(submitHandler)}>
          <h2 className="mb-5 text-2xl font-semibold">
            رمز عبور را به روز کنید
          </h2>
          <Controller
            name="currentPassword"
            control={control}
            render={({ field }) => (
              <FormInput
              type="password"
                warperClassName="mt-2"
                {...field}
                label="رمز عبور فعلی"
                placeholder="رمز عبور خود را تایپ کنید"
                minLength={6}
                required
              />
            )}
          />
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <FormInput
              type="password"
                warperClassName="mt-2"
                {...field}
                label="رمز عبور جدید"
                placeholder="رمز عبور خود را تایپ کنید"
                minLength={6}
                required
              />
            )}
          />

          <Button
            type="submit"
            className="w-full mt-4"
            label="  به روز رسانی"
          />
        </form>
      </div>
    </>
  );
};

export default UpdatePassword;
