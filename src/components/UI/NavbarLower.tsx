"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { link as linkStyles } from "@nextui-org/react";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/src/config/site";
import { Logo } from "@/src/components/icons";
import NavbarDropDown from "./navbarDropDown";
import { ThemeSwitch } from "./theme-switch";
import { useUser } from "@/src/context/user.provider";
import { Button } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/src/services/AuthService";
import { protectedRoutes } from "@/src/utils/constant";
import { Input } from "@nextui-org/react";
import {
  LayoutDashboard,
  Menu,
  SearchIcon,
  UserRound,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useGetUser } from "@/src/hooks/user.hook";

export const NavbarLower = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setIsLoading } = useUser();
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const { data } = useGetUser(user?.email!);

  const handleLogout = () => {
    logout();
    setIsLoading(true);

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };
  console.log(data);
  return (
    <NextUINavbar
      className="border-t-1 border-b-1 mt-16 hidden lg:flex"
      maxWidth="2xl"
      position="static"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        {/* <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">Recipe</p>
          </NextLink>
        </NavbarBrand> */}
        <NavbarContent className="hidden lg:flex basis-1 pl-4" justify="start">
          <NavbarItem>
            <div
              className={`relative text-base font-bold cursor-pointer `}
              onClick={() => setShowMegaMenu(!showMegaMenu)}
              //   onMouseLeave={() => setShowMegaMenu(false)}
            >
              <h1 className="text-base font-bold flex">
                <Menu />
              </h1>

              {/* Mega Menu */}
              {showMegaMenu && (
                <div className="absolute left-0 top-full mt-5 w-[200px] min-h-screen shadow-lg rounded-md p-4 ml-[-35px] z-50 bg-gray-100">
                  <div className="grid gap-4">
                    {/* Individual Links */}

                    <NextLink href="/profile" legacyBehavior>
                      <a
                        className={`font-medium cursor-pointer  hover:text-primary-500`}
                      >
                        Profile
                      </a>
                    </NextLink>
                    <NextLink
                      href={
                        user?.role === "user"
                          ? "/user-dashboard"
                          : "/admin-dashboard"
                      }
                      legacyBehavior
                    >
                      <a className="font-medium cursor-pointer hover:text-primary-500">
                        Dashboard
                      </a>
                    </NextLink>
                    <NextLink href="/about" legacyBehavior>
                      <a className="font-medium cursor-pointer hover:text-primary-500">
                        About
                      </a>
                    </NextLink>
                    <NextLink href="/contact" legacyBehavior>
                      <a className="font-medium cursor-pointer hover:text-primary-500">
                        Contact
                      </a>
                    </NextLink>
                  </div>
                </div>
              )}
            </div>
          </NavbarItem>
        </NavbarContent>

        <ul className="hidden lg:flex gap-16 justify-center items-center">
          <NavbarItem>
            <NextLink
              className={`text-lg ${pathname === "/" ? "text-secondary-500" : "text-primary-500"}`}
              href="/"
            >
              <div className="relative flex items-center group">
                <Zap
                  className={`text-gray-500 transition-all group-hover:opacity-0 group-hover:translate-y-4 ${pathname === "/" ? "text-secondary-500" : "text-primary-500"} `}
                />
                <p
                  className={`absolute left-1/2 -translate-x-1/2 translate-y-4 opacity-0 text-base  group-hover:translate-y-0 group-hover:opacity-100 transition-all ${pathname === "/" ? "hover:text-secondary-500" : "text-primary-500"}`}
                >
                  Recipe Feed
                </p>
              </div>
            </NextLink>
          </NavbarItem>
          <>
            <NavbarItem>
              <NextLink
                className={`text-lg ${pathname === "/profile" ? "text-secondary-500" : "text-primary-500"}`}
                href="/profile"
              >
                <div className="relative flex items-center group">
                  <UserRound
                    className={`text-gray-500 transition-all group-hover:opacity-0 group-hover:translate-y-4 ${pathname === "/profile" ? "text-secondary-500" : "text-primary-500"} `}
                  />
                  <p
                    className={`absolute left-1/2 -translate-x-1/2 translate-y-4 opacity-0 text-base  group-hover:translate-y-0 group-hover:opacity-100 transition-all ${pathname === "/profile" ? "hover:text-secondary-500" : "text-primary-500"}`}
                  >
                    Profile
                  </p>
                </div>
              </NextLink>
            </NavbarItem>
            <NavbarItem>
              <NextLink
                className={`text-lg ${pathname === "/user-dashboard" ? "text-secondary-500" : "text-primary-500"} ${pathname === "/admin-dashboard" ? "text-secondary-500" : "text-primary-500"}`}
                href={
                  user?.role === "user" ? "/user-dashboard" : "/admin-dashboard"
                }
              >
                <div className="relative flex items-center group">
                  <LayoutDashboard
                    className={`text-gray-500 transition-all group-hover:opacity-0 group-hover:translate-y-4 ${pathname === "/user-dashboard" ? "text-secondary-500" : "text-primary-500"} ${pathname === "/admin-dashboard" ? "text-secondary-500" : "text-primary-500"} `}
                  />
                  <p
                    className={`absolute left-1/2 -translate-x-1/2 translate-y-4 opacity-0 text-base  group-hover:translate-y-0 group-hover:opacity-100 transition-all ${pathname === "/user-dashboard" ? "text-secondary-500" : "text-primary-500"} ${pathname === "/admin-dashboard" ? "text-secondary-500" : "text-primary-500"}`}
                  >
                    Dashboard
                  </p>
                </div>
              </NextLink>
            </NavbarItem>
          </>
          {/* {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={pathname === item.href ? "primary" : "foreground"}
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))} */}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden md:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden lg:flex gap-2">
          <div>
            <p>
              Followers:{" "}
              <span className="text-primary-500">
                {data?.data?.follower?.length > 0
                  ? data?.data?.follower?.length
                  : "0"}
              </span>
            </p>
          </div>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-20 flex flex-col gap-2">
          <NavbarItem>
            <NextLink
              className={`text-lg ${pathname === "/" ? "text-primary-500" : ""}`}
              href="/"
            >
              Recipe Feed
            </NextLink>
          </NavbarItem>
          <>
            <NavbarItem>
              <NextLink
                className={`text-lg ${pathname === "/profile" ? "text-primary-500" : ""}`}
                href="/profile"
              >
                Profile
              </NextLink>
            </NavbarItem>
            <NavbarItem>
              <NextLink
                href={
                  user?.role === "user" ? "/user-dashboard" : "/admin-dashboard"
                }
                className={`text-lg ${pathname === "/user-dashboard" ? "text-primary-500" : ""} ${pathname === "/admin-dashboard" ? "text-primary-500" : ""}`}
              >
                Dashboard
              </NextLink>
            </NavbarItem>
          </>
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={pathname === item.href ? "primary" : "foreground"}
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}

          {user && user.email ? (
            <p
              onClick={handleLogout}
              className="font-bold cursor-pointer bg-default-200 hover:bg-red-500 w-fit py-2 px-4 rounded-md"
            >
              Logout
            </p>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
