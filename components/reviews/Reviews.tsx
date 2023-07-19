import Image from "next/image";
import React, { FC } from "react";
import StarRatings from "react-star-ratings";

interface Props {
  reviews: Array<Review>;
}

const Reviews: FC<Props> = ({ reviews }) => {
  return (
    <div dir="rtl" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {reviews?.map((review) => (
        <article
          key={review._id}
          className="block p-6 bg-white max-w-sm rounded-lg border border-gray-200 shadow-md mb-5"
        >
          <div className="flex items-center mb-4 gap-4">
            <Image
              width={40}
              height={40}
              className=" rounded-full"
              src={
                review?.user?.avatar
                  ? review?.user?.avatar?.url
                  : "/images/default.png"
              }
              alt="user"
            />
            <div className="space-y-1 font-medium">
              <p>
                {review?.user?.name}
                <time className="block text-sm text-gray-500 dark:text-gray-400">
                  Posted on: {review?.createdAt.substring(0, 10)}
                </time>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className="ratings">
              <StarRatings
                rating={review?.rating}
                starRatedColor="#ffb829"
                numberOfStars={5}
                starDimension="18px"
                starSpacing="1px"
                name="rating"
              />
            </div>
            <span className="text-yellow-500">{review?.rating}</span>
          </div>

          <p className="mb-2 font-light text-gray-500 dark:text-gray-400 text-xl">
            {review?.comment}
          </p>
        </article>
      ))}
    </div>
  );
};

export default Reviews;
