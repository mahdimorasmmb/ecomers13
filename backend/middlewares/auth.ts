import { getToken } from "next-auth/jwt";
import ErrorHandler from "../utils/errorHandler";

const isAuthenticatedUser = async (requset: Request) => {
  const session = await getToken({ req: requset as any });
  if (!session) {
   throw new ErrorHandler('Login first to access this route',404)
  }

  requset.headers.set("user_id", session.user?._id || "");
};

export default isAuthenticatedUser;
