"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import FormInput from "../FormInput";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import { useSession } from "next-auth/react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const UpdateProfile = () => {
  const router = useRouter();
  const { data, update } = useSession();
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      name: data?.user.name,
      email: data?.user.email,
      avatar: ''
    },
  });
  const [avatarPreview, setAvatarPreview] = useState<string | ArrayBuffer>(
    "/images/default.png"
  );


  const submitHandler = async (value: any) => {
    const formData = new FormData();
    formData.set("name", value.name);
    formData.set("email", value.email);
    formData.set("image", value.avatar);

    try {
      const res = await axios.put(`/api/user/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data.message);
      await update();
      router.refresh();
      router.push("/me");
    } catch (error) {
      if (error instanceof AxiosError) {
        return toast.error(error.response?.data.message);
      }
    }
  };
  const onChange = (e: any) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        reader.result && setAvatarPreview(reader.result);
      }
    };
    setValue("avatar", e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (data?.user.avatar.url) {
      setAvatarPreview(data?.user.avatar.url);
    }
  }, [data?.user.avatar]);

  return (
    <>
      <div
        dir="rtl"
        style={{ maxWidth: "480px" }}
        className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white"
      >
        <form onSubmit={handleSubmit(submitHandler)}>
          <h2 className="mb-5 text-2xl font-semibold">بروزرسانی پروفایل</h2>

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <FormInput
                warperClassName="mt-2"
                {...field}
                label="نام کامل"
                placeholder="نامتان را بنویسید"
                required
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

          <div className="mb-4 mt-4">
            <label className="block mb-1"> آواتار </label>
            <div className="mb-4 flex flex-col md:flex-row">
              <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer md:w-1/5 lg:w-1/4">
                <Image
                  className=" rounded-full"
                  src={avatarPreview as string}
                  alt="awatar"
                  width={56}
                  height={56}
                />
              </div>
              <div className="md:w-2/3 lg:w-80">
                <input
                  className="form-control block w-full px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-6"
                  type="file"
                  id="formFile"
                  onChange={onChange}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            // disabled={loading ? true : false}
          >
            {/* {loading ? "Updating..." : "Update"} */} Update
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProfile;
