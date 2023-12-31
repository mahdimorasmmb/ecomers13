import ErrorHandler from "../utils/errorHandler";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const isAuthenticatedUser = async (requset: any, role?: string) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new ErrorHandler("Login first to access this route", 404);
  }

  if (role && session?.user.role !== role) {
    throw new ErrorHandler("You not Accese this route", 404);
  }

  requset.headers.set("user_id", session.user?._id || "");
};

export default isAuthenticatedUser;
