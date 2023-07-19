export const getUserReview = (reviews:Array<Review>, userId:string) :Review | undefined => {
  let userReview

  reviews.forEach((review) => {
    if (review?.user?._id === userId) {
      userReview = review;
    }
  });

  return userReview 
};
