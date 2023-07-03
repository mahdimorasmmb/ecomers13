import { getToken } from "next-auth/jwt";
import ErrorHandler from "../utils/errorHandler";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const isAuthenticatedUser = async (requset: Request) => {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session) {
    throw new ErrorHandler("Login first to access this route", 404);
  }

  requset.headers.set("user_id", session.user?._id || "");
};

export default isAuthenticatedUser;
