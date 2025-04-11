import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getUser } from "./utils/serverCookies";

export async function middleware(request: NextRequest) {
  const user = await getUser();

  if (user) {
    if (
      request.nextUrl.pathname.startsWith("/superuser") &&
      user.role !== "superuser"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (
      request.nextUrl.pathname.includes("login") ||
      request.nextUrl.pathname.includes("register") ||
      request.nextUrl.pathname.includes("verify-email")
    ) {
      return NextResponse.redirect(new URL("/account", request.url));
    }
  } else {
    if (
      request.nextUrl.pathname.includes("superuser") ||
      request.nextUrl.pathname.includes("account")
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
