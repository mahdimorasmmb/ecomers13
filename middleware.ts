import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
export async function middleware(request: NextRequest, _next: NextFetchEvent) {
  const { pathname } = request.nextUrl;
  const adminPaths = ["/admin"].some((path) => pathname.startsWith(path));
  const loginPaths = ["/me", "/shipping"].some((path) =>
    pathname.startsWith(path)
  );

  if (loginPaths) {
    const token = await getToken({ req: request });
    if (!token) {
      const url = new URL(`/login`, request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  } else if (adminPaths) {
    const token = await getToken({ req: request });
    if (!token) {
      const url = new URL(`/login`, request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }
    if (token.user?.role !== "admin") {      
      const url = new URL(`/403`, request.url);
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }
}
