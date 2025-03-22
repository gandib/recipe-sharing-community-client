import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

const AuthRoutes = ["/login", "/register"];
const roleBaseRoutes = {
  user: [/^\/$/, /^\/user-dashboard/, /^\/profile$/],
  admin: [/^\/$/, /^\/admin-dashboard/, /^\/profile$/],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getCurrentUser();

  // Ensure logout works properly
  if (!user) {
    if (pathname === "/logout") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url),
    );
  }

  // Allow route access based on role
  const allowedRoutes =
    roleBaseRoutes[user.role as keyof typeof roleBaseRoutes] || [];

  if (allowedRoutes.some((route) => route.test(pathname))) {
    return NextResponse.next();
  }

  // Prevent redirect loop after logout
  if (pathname !== "/logout") {
    const redirectPath = user.role === "admin" ? "/admin-dashboard" : "/";

    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/user-dashboard",
    "/user-dashboard/:page*",
    "/admin-dashboard",
    "/admin-dashboard/:page*",
    "/login",
    "/register",
    "/profile",
    "/logout",
  ],
};
