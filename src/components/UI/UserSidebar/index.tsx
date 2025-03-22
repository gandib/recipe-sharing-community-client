"use client";

import { Spinner } from "@nextui-org/react";
import { userLinks } from "./constant";
import UserSidebarOptions from "./UserSidebarOptions";
import { useUser } from "@/src/context/user.provider";

const UserSidebar = () => {
  const { user: userData, isLoading } = useUser();

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <div className="">
      <div className="mt-3 space-y-2 min-h-screen rounded-xl text-white p-2 sticky top-20">
        {isLoading && (
          <div className=" fixed w-1/4 h-14 rounded-md  flex justify-center items-center">
            <Spinner />
          </div>
        )}

        <UserSidebarOptions links={userLinks} />
      </div>
    </div>
  );
};

export default UserSidebar;
