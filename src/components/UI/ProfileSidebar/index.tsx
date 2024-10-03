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
    <div>
      {/* <div className="rounded-xl bg-default-100 p-2">
        <div className="h-[100px] w-full rounded-md ">
          <Image
            src={user?.data?.image as string}
            alt="Profile"
            height={100}
            width={100}
            className="rounded-xl"
          />
        </div>
        <div className="my-3">
          <h1 className="text-2xl font-semibold">{user?.data?.name}</h1>
          <p className="break-words text-sm">{user?.data?.email}</p>
          <p className="break-words text-sm py-3 text-justify">
            {user?.data?.bio}
          </p>
        </div>
        <Button
          as={Link}
          className="mt-2 w-full rounded-md"
          href="/profile/update-profile"
        >
          Update Profile
        </Button>
      </div> */}

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
