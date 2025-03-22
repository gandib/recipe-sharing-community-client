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
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ThemeSwitch } from "./theme-switch";
import NavbarDropDown from "./navbarDropDown";
import { protectedRoutes } from "@/src/utils/constant";
import { logout } from "@/src/services/AuthService";
import { useUser } from "@/src/context/user.provider";
import { siteConfig } from "@/src/config/site";
import { Logo } from "@/src/components/icons";
import useDebounce from "@/src/hooks/debounce.hook";
import { getAllMyRecipes } from "@/src/services/Recipe";
import { IRecipe, queryParams } from "@/src/types";

type TRecipeMeta = {
  meta: { page: number; limit: number; total: number; totalPage: number };
  result: IRecipe[];
};

export const Navbar = () => {
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
      className="border-b-1 fixed bg-default-50"
      maxWidth="2xl"
      position="sticky"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo className="text-gray-700" />
            <p className="font-bold text-inherit text-gray-700">Recipe</p>
          </NextLink>
        </NavbarBrand>

        <div className="flex justify-center items-center my-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("search")}
              aria-label="Search"
              color="primary"
              placeholder="Search..."
              size="md"
              startContent={
                <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-400" />
              }
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

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
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
                  className={`text-lg  ${pathname === "/admin-dashboard" ? "text-primary-500" : ""}`}
                  href={"/admin-dashboard"}
                >
                  Dashboard
                </NextLink>
              </NavbarItem>
            ) : null}
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
              className="font-bold cursor-pointer bg-default-200 hover:bg-red-500 w-fit py-2 px-4 rounded-md"
              onClick={handleLogout}
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
