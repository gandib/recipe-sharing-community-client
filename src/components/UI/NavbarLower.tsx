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
  UsersRound,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useGetUser } from "@/src/hooks/user.hook";
import { IRecipe } from "@/src/types";
import { FieldValues, useForm } from "react-hook-form";
import useDebounce from "@/src/hooks/debounce.hook";
import { queryParams } from "./AdminDashboardCard";
import { getAllMyRecipes } from "@/src/services/Recipe";

type TRecipeMeta = {
  meta: { page: number; limit: number; total: number; totalPage: number };
  result: IRecipe[];
};

export const NavbarLower = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setIsLoading, isLoading } = useUser();
  const [recipeData, setRecipeData] = useState<TRecipeMeta>();
  const { register, handleSubmit, watch, setValue } = useForm();
  const searchText = useDebounce(watch("search"));
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    logout();
    setIsLoading(true);

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  useEffect(() => {
    const query: queryParams[] = [];
    query.push({ name: "limit", value: 10 });
    query.push({ name: "searchTerm", value: searchText });

    const fetchData = async () => {
      const { data: allRecipes } = await getAllMyRecipes(query);
      setRecipeData(allRecipes);
      setLoading(false);
    };

    if (searchText) {
      setLoading(true);
      fetchData();
    } else {
      setRecipeData(undefined); // Clear the product data when search text is cleared
    }
  }, [searchText]);

  const onSubmit = (data: FieldValues) => {};

  if (isLoading) {
    <p>Loading...</p>;
  }
  return (
    <NextUINavbar
      className="border-t-1 border-b-1 fixed "
      maxWidth="2xl"
      position="static"
    >
      <NavbarContent className="basis-1/5 sm:basis-full mr-8" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo className="text-gray-700" />
            <p className="font-bold text-inherit text-gray-700">Recipe</p>
          </NextLink>
        </NavbarBrand>

        <div className="flex justify-center items-center my-2 w-40 sm:w-60 lg:w-48">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("search")}
              aria-label="Search"
              placeholder="Search..."
              size="md"
              startContent={
                <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-400" />
              }
              color="primary"
              type="text"
            />
          </form>
        </div>

        {/* <ul className="hidden lg:flex gap-4 justify-start ml-2">
          <NavbarItem>
            <NextLink
              className={`text-lg ${pathname === "/" ? "text-primary-500" : ""}`}
              href="/"
            >
              Recipe Feed
            </NextLink>
          </NavbarItem>
          {user?.email && (
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
                    user?.role === "user"
                      ? "/user-dashboard"
                      : "/admin-dashboard"
                  }
                  className={`text-lg ${pathname === "/user-dashboard" ? "text-primary-500" : ""} ${pathname === "/admin-dashboard" ? "text-primary-500" : ""}`}
                >
                  Dashboard
                </NextLink>
              </NavbarItem>
            </>
          )}
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
        </ul> */}
      </NavbarContent>

      <NavbarContent
        justify="center"
        className="hidden lg:flex gap-16 justify-center items-center"
      >
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
          {user?.role === "admin" ? (
            <NavbarItem>
              <NextLink
                className={`text-lg ${pathname === "/user-dashboard" ? "text-secondary-500" : "text-primary-500"} ${pathname === "/admin-dashboard" ? "text-secondary-500" : "text-primary-500"}`}
                href={"/admin-dashboard"}
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
          ) : null}
          {/* <NavbarItem>
              <NextLink
                className={`text-lg ${pathname === "/my-group" ? "text-secondary-500" : "text-primary-500"}`}
                href={"/my-group"}
              >
                <div className="relative flex items-center group">
                  <UsersRound
                    className={`text-gray-500 transition-all group-hover:opacity-0 group-hover:translate-y-4 ${pathname === "/my-group" ? "text-secondary-500" : "text-primary-500"}`}
                  />
                  <p
                    className={`absolute left-1/2 -translate-x-1/2 translate-y-4 opacity-0 text-base  group-hover:translate-y-0 group-hover:opacity-100 transition-all ${pathname === "/my-group" ? "text-secondary-500" : "text-primary-500"}`}
                  >
                    Group
                  </p>
                </div>
              </NextLink>
            </NavbarItem> */}
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
      </NavbarContent>

      <NavbarContent
        className="hidden md:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden lg:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        {user?.email ? (
          <NavbarItem className="hidden lg:flex gap-2">
            <NavbarDropDown />
          </NavbarItem>
        ) : (
          <NavbarItem className="hidden sm:flex gap-2">
            <Link href="/login">Login</Link>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      {/* <NavbarContent
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
      </NavbarContent> */}

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
            {user?.role === "admin" ? (
              <NavbarItem>
                <NextLink
                  href={"/admin-dashboard"}
                  className={`text-lg  ${pathname === "/admin-dashboard" ? "text-primary-500" : ""}`}
                >
                  Dashboard
                </NextLink>
              </NavbarItem>
            ) : null}
            {/* <NavbarItem>
              <NextLink
                href={"/my-group"}
                className={`text-lg ${pathname === "/my-group" ? "text-primary-500" : ""}`}
              >
                Group
              </NextLink>
            </NavbarItem> */}
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
