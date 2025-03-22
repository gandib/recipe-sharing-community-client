"use client";
import { Avatar } from "@nextui-org/react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/src/context/user.provider";

const NavbarDropDown = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setIsLoading, isLoading } = useUser();

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  const handleLogout = () => {
    // logout();
    setIsLoading(true);

    // if (protectedRoutes.some((route) => pathname.match(route))) {
    //   router.push("/login");
    // }
    document.cookie =
      "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    localStorage.clear();
    sessionStorage.clear();

    window.location.href = "/login";
  };

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className="cursor-pointer" src={user?.image} />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          key={"Profile"}
          onPress={() => handleNavigation("/profile")}
        >
          Profile
        </DropdownItem>
        {/* <DropdownItem
          onPress={() => handleNavigation("/profile/update-profile")}
          key={"UpdateProfile"}
        >
          Update Profile
        </DropdownItem> */}
        {/* {user?.role === "user" ? (
          <DropdownItem
            onPress={() => handleNavigation("/profile/get-membership")}
            key="UpdateProfile"
          >
            Get Membership
          </DropdownItem>
        ) : null} */}
        {/* <DropdownItem
          onPress={() => handleNavigation("/profile/change-password")}
          key={"UpdateProfile"}
        >
          Change Password
        </DropdownItem> */}

        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          onPress={handleLogout}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarDropDown;
