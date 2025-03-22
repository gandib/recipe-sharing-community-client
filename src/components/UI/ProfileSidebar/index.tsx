"use client";
import { Spinner } from "@nextui-org/react";
import ProfileSidebarOptions from "./ProfileSidebarOptions";
import { profileLinks } from "./constant";
import { useGetUser } from "@/src/hooks/user.hook";
import { useUser } from "@/src/context/user.provider";

const ProfileSidebar = () => {
  const { user: userData, isLoading } = useUser();
  const { data: user, isPending } = useGetUser(userData?.email!);

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

        <ProfileSidebarOptions links={profileLinks} />
      </div>
    </div>
  );
};

export default ProfileSidebar;
