import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./services/AuthService";

const AuthRoutes = ["/login", "/register"];

type TRole = keyof typeof roleBaseRoutes;

const roleBaseRoutes = {
  user: [/^\/user-dashboard/],
  admin: [/^\/admin-dashboard/],
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getCurrentUser();
  console.log(user);

  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  if (user?.role && roleBaseRoutes[user?.role as TRole]) {
    const routes = roleBaseRoutes[user?.role as TRole];

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/user-dashboard",
    "/user-dashboard/:page*",
    "/admin-dashboard",
    "/admin-dashboard/:page*",
    "/login",
    "/register",
  ],
};
