"use client";
import { useUser } from "@/src/context/user.provider";
import { useGetUser } from "@/src/hooks/user.hook";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "../../../../src/styles/animation.css";

const Profile = () => {
  const { user: userData, isLoading } = useUser();
  const { data: user, isPending } = useGetUser(userData?.email!);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    return () => {
      setIsVisible(false);
    };
  }, []);
  return (
    <div
      className={`transition-opacity duration-500 ${isVisible ? "fade-enter-active" : "fade-enter"}`}
    >
      <div className="rounded-xl bg-default-100 p-2">
        <div className="h-[100px] w-full rounded-md flex gap-2">
          <Image
            src={user?.data?.image as string}
            alt="Profile"
            height={100}
            width={100}
            className="rounded-xl"
          />
          <div>
            <p className=" rounded-full bg-primary-500 px-2 text-tiny uppercase text-white/90">
              {user?.data?.membership}
            </p>
          </div>
        </div>
        <div className="my-3">
          <h1 className="text-2xl font-semibold">{user?.data?.name}</h1>
          <p className="break-words text-sm">{user?.data?.email}</p>
          <p className="break-words text-sm py-3 text-justify">
            {user?.data?.bio}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
