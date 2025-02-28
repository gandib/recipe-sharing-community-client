"use client";

import HomePageCreatePost from "@/src/components/UI/HomePageCreatePost";
import HomePageFeedCard from "@/src/components/UI/HomePageFeedCard";
import HomePageRecentPost from "@/src/components/UI/HomePageRecentPost";
import { useUser } from "@/src/context/user.provider";
import { useGetUser, useUpdateUnfollowing } from "@/src/hooks/user.hook";
import { getAllMyRecipes } from "@/src/services/Recipe";
import { IUser } from "@/src/types";
import { Button, Card } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Timeline");
  const { user: userData, isLoading } = useUser();
  const { data: user, isPending } = useGetUser(userData?.email!);
  const [isVisible, setIsVisible] = useState(false);
  const { mutate: unFollowing } = useUpdateUnfollowing(user?.email!);
  const [recipe, setRecipe] = useState();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const { data: allRecipe } = await getAllMyRecipes([
          { name: "sort", value: "-createdAt" },
          { name: "contentType", value: "free" },
        ]);
        setRecipe(allRecipe);
      };

      fetchData();
    } catch (error) {
      console.log("Recipe fetch faild", error);
    }
  }, []);

  const handleUnFollowing = (followingId: string) => {
    const unfollowingData = {
      id: user?._id,
      data: {
        following: followingId,
      },
    };

    unFollowing(unfollowingData);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Timeline":
        return (
          <div className="container mx-auto max-w-7xl pt-4 px-6 flex-grow min-h-screen lg:col-span-2 mt-4 lg:mt-0 ">
            <div className="">
              {/* create new post section */}
              <HomePageCreatePost />

              <div className=" mb-8">
                <HomePageFeedCard recipe={recipe!} />
              </div>
            </div>
          </div>
        );
      case "Following":
        return (
          <div className="container mx-auto max-w-7xl pt-4 px-6 flex-grow min-h-screen mt-4">
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4">
              {user?.data?.following?.map((following: IUser, index: number) => (
                <Card
                  className="shadow-lg w-full h-48 flex flex-col justify-center items-center"
                  key={index}
                >
                  <div className="h-[100px] w-[100px] border-2 border-primary-500 rounded-lg ">
                    <Image
                      src={following.image}
                      width={100}
                      height={100}
                      alt="User"
                      className="h-full w-full pt-1"
                    />
                  </div>
                  <p className="my-2 font-semibold">{following.name}</p>
                  <Button
                    size="sm"
                    className="text-white bg-primary-500 py-3 my-2 font-semibold"
                    onPress={() => handleUnFollowing(following._id)}
                  >
                    Unfollow
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        );
      case "Followers":
        return (
          <div className="container mx-auto max-w-7xl pt-4 mt-4 px-6 flex-grow min-h-screen">
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4">
              {user?.data?.follower?.map((follower: IUser, index: number) => (
                <Card
                  className="shadow-lg w-full h-48 flex flex-col justify-center items-center"
                  key={index}
                >
                  <div className="h-[100px] w-[100px] border-2 border-primary-500 rounded-lg ">
                    <Image
                      src={follower.image}
                      width={100}
                      height={100}
                      alt="User"
                      className="h-full w-full pt-1"
                    />
                  </div>
                  <p className="my-2 font-semibold">{follower.name}</p>
                </Card>
              ))}
            </div>
          </div>
        );
      case "About":
        return (
          <div className="container mx-auto max-w-7xl pt-4 mt-4 px-6 flex-grow min-h-screen">
            <div className="text-xl">{user?.data?.bio}</div>
          </div>
        );
      default:
        return (
          <div className="container mx-auto max-w-7xl pt-4 px-6 flex-grow min-h-screen">
            Select a tab to see content.
          </div>
        );
    }
  };

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen  lg:mt-0">
      {/* Header Section */}
      <div className="relative">
        <div className="h-56 bg-blue-600"></div>
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex items-center flex-col">
          <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden">
            <img
              src={user?.data?.image as string}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold mt-2 text-white">
            {user?.data?.name}
          </h2>
          <p className="text-sm text-gray-200">{user?.data?.email}</p>
        </div>

        {/* Navigation Tabs */}
        <div className="absolute bottom-0 left-0 w-full">
          <div className="flex justify-center  px-6 border-b border-gray-200">
            {["Timeline", "Followers", "Following", "About"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2  font-semibold text-base ${
                  activeTab === tab
                    ? "text-blue-600 font-bold bg-white rounded-se-3xl"
                    : "text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="  grid lg:grid-cols-3 gap-4 container mx-auto">
        <div className="lg:col-span-2">{renderContent()}</div>

        <div className="hidden lg:flex lg:col-span-1  p-4 rounded  sticky top-5">
          <div className="hidden flex-col lg:flex lg:col-span-1">
            <HomePageRecentPost recipes={recipe!} />
          </div>
        </div>
      </div>
    </div>
  );
}
