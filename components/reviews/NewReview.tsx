import { getUserReview } from "@/tools/getUserReview";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";
import FormItem from "../FormItem";
import Button from "../Button";
import { useMutation } from "@tanstack/react-query";
import { postReviews } from "@/tools/api";
import { AxiosError } from "axios";
import { Session } from "next-auth";

interface Props {
  product: Product;
  serverSession: Session | null;
}

const NewReview: FC<Props> = ({ product, serverSession }) => {
  const session = useSession();
  const router = useRouter();

  const userId = session.data?.user._id || serverSession?.user._id || "";

  const { control, handleSubmit } = useForm({
    defaultValues: { ...getUserReview(product?.reviews, userId) },
  });

  const mutation = useMutation({
    mutationFn: postReviews,
    onSuccess(data, variables, context) {
      toast.success("نظر شما ثبت گردید");
      router.refresh();
    },
    onError(error, variables, context) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    },
  });

  const submitHandler = async (value: any) => {
    const reviewData = { ...value, productId: product?._id };
    mutation.mutate(reviewData);
  };
  return (
    <div>
      <hr className="my-4" />
      <h1 className="text-gray-500 review-title my-5 text-2xl">نقد شما</h1>

      <h3>رتبه بندی</h3>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="mb-4 mt-3">
          <div className="ratings">
            <Controller
              control={control}
              name="rating"
              render={({ field: { onChange, value, ...otherField } }) => (
                <StarRatings
                  starRatedColor="#ffb829"
                  numberOfStars={5}
                  changeRating={onChange}
                  rating={value}
                  {...otherField}
                />
              )}
            />
          </div>
        </div>
        <FormItem label="نظرات">
          <Controller
            control={control}
            name="comment"
            render={({ field }) => (
              <textarea
                rows={4}
                className="  appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-1/2 "
                placeholder="بررسی شما"
                {...field}
              />
            )}
          />
        </FormItem>

        <Button
          isLoding={mutation.isLoading}
          className="my-3"
          type="submit"
          label="ارسال بررسی"
        />
      </form>
    </div>
  );
};

export default NewReview;
