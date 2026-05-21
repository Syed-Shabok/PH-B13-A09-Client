import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  // Protected routes
  const isProtected =
    pathname.startsWith("/add-idea") ||
    pathname.startsWith("/my-ideas") ||
    pathname.startsWith("/my-interactions") ||
    pathname.startsWith("/profile-management") ||
    pathname.startsWith("/ideas/");

  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!session && isProtected) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/add-idea/:path*",
    "/my-ideas/:path*",
    "/my-interactions/:path*",
    "/profile-management/:path*",
    "/ideas/:path*",
  ],
};
