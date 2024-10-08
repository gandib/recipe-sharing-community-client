"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useUser } from "@/src/context/user.provider";
import { Spinner } from "@nextui-org/spinner";
import Image from "next/image";
import ProfileSidebarOptions from "./ProfileSidebarOptions";
import { profileLinks } from "./constant";
import { useGetUser } from "@/src/hooks/user.hook";
import { useEffect } from "react";

const ProfileSidebar = () => {
  const { user: userData, isLoading } = useUser();
  const { data: user, isPending } = useGetUser(userData?.email!);
  // useEffect(() => {
  //   if (userData?.email) {
  //     handleGetUser(userData.email);
  //   }
  // }, [userData]);

  console.log(user);
  return (
    <div className="fixed">
      <div className="mt-3 space-y-2 min-h-screen rounded-xl bg-default-100 p-2">
        {isLoading && (
          <div className=" bg-black/10 fixed w-1/4 h-14 rounded-md backdrop-blur-md flex justify-center items-center">
            <Spinner />
          </div>
        )}

        <ProfileSidebarOptions links={profileLinks} />
      </div>
    </div>
  );
};

export default ProfileSidebar;
