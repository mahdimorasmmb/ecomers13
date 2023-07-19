"use client";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

import Button from "../Button";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const UploadImages = ({ id }: { id: string }) => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (formData: FormData) => {
      return axios.post(`/api/products/${id}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess(data, variables, context) {
      toast.success(data.data.message);
      router.push("/admin/products");
    },
    onError(error, variables, context) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.statusText);
      }
    },
  });
  const [images, setImages] = useState<any>([]);
  const [imagesPreview, setImagesPreview] = useState<any>([]);

  const onChange = (e: any) => {
    const files = Array.from(e.target.files) as Array<Blob>;

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray: any) => [...oldArray, reader.result]);
        }
      };

      setImages((oldArray: any) => [...oldArray, file]);
      reader.readAsDataURL(file);
    });
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    images.forEach((image: any) => {
      formData.append("image", image);
    });

    mutation.mutate(formData);
  };

  return (
    <div
      dir="rtl"
      style={{ maxWidth: "480px" }}
      className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
    >
      <form onSubmit={submitHandler}>
        <h2 className="mb-3 text-2xl font-semibold">آپلود تصاویر محصول</h2>

        <div className="mb-4 flex flex-col md:flex-row">
          <div className="w-full mt-2 flex items-center gap-2">
            <label
              className=" cursor-pointer   hover:bg-slate-600 text-white  bg-slate-500 px-2 py-1.5 text-base font-normal  bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              htmlFor="formFile"
            >
              انتخاب فایل
            </label>
            {images.length === 0 && <p>هیچ فایلی انتخاب نشده است</p>}
            <input
              className="hidden"
              type="file"
              id="formFile"
              multiple
              onChange={onChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-6 gap-2 my-2">
          {imagesPreview?.map((img: any) => (
            <Image
              src={img}
              key={img}
              alt="Preview"
              className="col-span-1 object-contain shadow rounded border-2 border-gray p-2 h-full w-full"
              width="50"
              height="50"
            />
          ))}
        </div>

        <Button
          disabled={images.length === 0}
          isLoding={mutation.isLoading}
          label=" بارگذاری"
          className="w-full justify-center "
          type="submit"
        />
      </form>
    </div>
  );
};

export default UploadImages;
