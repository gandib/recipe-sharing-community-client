"use client";
import { useUser } from "@/src/context/user.provider";
import { useGetUser } from "@/src/hooks/user.hook";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";

const Profile = () => {
  const { user: userData, isLoading } = useUser();
  const { data: user, isPending } = useGetUser(userData?.email!);
  return (
    <div>
      <div className="rounded-xl bg-default-100 p-2">
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
      </div>
    </div>
  );
};

export default Profile;
