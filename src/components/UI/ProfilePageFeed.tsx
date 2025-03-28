"use client";

import { Button, Card } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import ChangePassword from "@/src/components/UI/ChangePassword";
import HomePageCreatePost from "@/src/components/UI/HomePageCreatePost";
import HomePageFeedCard from "@/src/components/UI/HomePageFeedCard";
import HomePageFollowing from "@/src/components/UI/HomePageFollowing";
import HomePageRecentPost from "@/src/components/UI/HomePageRecentPost";
import MembershipCard from "@/src/components/UI/MembershipCard";
import ProfileLeftSidebar from "@/src/components/UI/ProfileLeftSidebar";
import UpdateProfile from "@/src/components/UI/UpdateProfile";
import { useUser } from "@/src/context/user.provider";
import { useGetUser, useUpdateUnfollowing } from "@/src/hooks/user.hook";
import { getAllMyRecipes, getAllRecipes } from "@/src/services/Recipe";
import { IUser, TRecipeMeta } from "@/src/types";

export default function ProfilePageFeed({
  allRecipes,
  recipes,
}: {
  allRecipes?: TRecipeMeta;
  recipes?: TRecipeMeta;
}) {
  const [activeTab, setActiveTab] = useState("Timeline");
  const { user: userData, isLoading } = useUser();
  const { data: user, isPending } = useGetUser(userData?.email!);
  const { mutate: unFollowing } = useUpdateUnfollowing(user?.email!);
  const [recipe, setRecipe] = useState(recipes?.result);
  const [allRecipe, setAllRecipe] = useState(allRecipes?.result);
  const [revalidateProfile, setRevalidateProfile] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: recipes } = await getAllMyRecipes([
          { name: "sort", value: "-createdAt" },
          { name: "contentType", value: "free" },
        ]);

        setRecipe(recipes?.result);

        const { data: allRecipes } = await getAllRecipes([
          { name: "sort", value: "-createdAt" },
        ]);

        setAllRecipe(allRecipes?.result);
      } catch (error) {
        console.log("Recipe fetch failed", error);
      }
    };

    if (revalidateProfile) {
      setRevalidateProfile(false);
    }

    fetchData();
  }, [revalidateProfile]);

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
          <div className="container mx-auto max-w-7xl pt-4 flex-grow min-h-screen lg:col-span-2 mt-4 lg:mt-0 ">
            <div className="">
              {/* create new post section */}
              <HomePageCreatePost
                revalidateProfile={revalidateProfile}
                setRevalidateProfile={setRevalidateProfile}
              />
              <div className=" mb-8">
                <HomePageFeedCard
                  recipe={recipe!}
                  revalidateProfile={revalidateProfile}
                  setRevalidateProfile={setRevalidateProfile}
                />
              </div>
            </div>
          </div>
        );
      case "Following":
        return (
          <div className="container mx-auto max-w-7xl pt-4 flex-grow min-h-screen mt-4">
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4">
              {user?.data?.following?.map((following: IUser, index: number) => (
                <Card
                  key={index}
                  className="shadow-lg w-full h-48 flex flex-col justify-center items-center"
                >
                  <div className="h-[100px] w-[100px]  ">
                    <Image
                      alt="User"
                      className="h-full w-full border-2 border-primary-500 rounded-lg"
                      height={100}
                      src={following.image}
                      width={100}
                    />
                  </div>
                  <p className="my-2 font-semibold">{following.name}</p>
                  <Button
                    className="text-white bg-primary-500 py-3 my-2 font-semibold"
                    size="sm"
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
          <div className="container mx-auto max-w-7xl pt-4 mt-4 flex-grow min-h-screen">
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4">
              {user?.data?.follower?.map((follower: IUser, index: number) => (
                <Card
                  key={index}
                  className="shadow-lg w-full h-48 flex flex-col justify-center items-center"
                >
                  <div className="h-[100px] w-[100px]  ">
                    <Image
                      alt="User"
                      className="h-full w-full border-2 border-primary-500 rounded-lg"
                      height={100}
                      src={follower.image}
                      width={100}
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
          <div className="container mx-auto max-w-7xl pt-4 mt-4 flex-grow min-h-screen">
            {
              <div className="text-xl">
                {user?.data?.bio ? user?.data?.bio : "Bio not updated yet!"}
              </div>
            }
          </div>
        );

      case "Update Profile":
        return (
          <div className="container mx-auto max-w-7xl pt-4 flex-grow min-h-screen">
            <div className="text-xl">
              <UpdateProfile />
            </div>
          </div>
        );

      case "Get Membership":
        return (
          <div className="container mx-auto max-w-7xl pt-4 flex-grow min-h-screen">
            <div className="text-xl">
              <MembershipCard />
            </div>
          </div>
        );

      case "Change Password":
        return (
          <div className="container mx-auto max-w-7xl pt-4 flex-grow min-h-screen">
            <div className="text-xl">
              <ChangePassword />
            </div>
          </div>
        );

      default:
        return (
          <div className="container mx-auto max-w-7xl pt-4 flex-grow min-h-screen">
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

      {/* Content Section */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 container mx-auto max-w-screen-2xl">
        <div className="hidden flex-col lg:flex lg:col-span-1 p-4 w-full gap-4">
          <ProfileLeftSidebar setActiveTab={setActiveTab} />
          <div className="sticky top-20">
            <HomePageRecentPost recipes={allRecipe!} title="Latest Recipes" />
          </div>
        </div>

        <div className="md:col-span-2 p-4 gap-4">
          <div className="relative  ">
            <div className="h-56 bg-blue-600 rounded-sm"></div>
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex items-center flex-col">
              <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden">
                <img
                  alt="Profile"
                  className="w-full h-full object-cover"
                  src={user?.data?.image as string}
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
                    className={`px-4 py-2  font-semibold text-base ${
                      activeTab === tab
                        ? "text-blue-600 font-bold bg-white rounded-se-3xl"
                        : "text-white"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="">{renderContent()}</div>
        </div>

        <div className="hidden md:flex md:col-span-1  p-4 rounded  sticky top-5">
          <div className="hidden flex-col md:flex md:col-span-1 w-full gap-4">
            <HomePageRecentPost recipes={recipe!} title="My Recent Posts" />
            <HomePageFollowing />
          </div>
        </div>
      </div>
    </div>
  );
}
