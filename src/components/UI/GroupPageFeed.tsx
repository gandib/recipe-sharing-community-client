"use client";

import ChangePassword from "@/src/components/UI/ChangePassword";
import HomePageCreatePost from "@/src/components/UI/HomePageCreatePost";
import HomePageFeedCard from "@/src/components/UI/HomePageFeedCard";
import HomePageMyGroups from "@/src/components/UI/HomePageMyGroups";
import HomePageRecentPost from "@/src/components/UI/HomePageRecentPost";
import MembershipCard from "@/src/components/UI/MembershipCard";
import UpdateProfile from "@/src/components/UI/UpdateProfile";
import { useUser } from "@/src/context/user.provider";
import { useGetUser, useUpdateUnfollowing } from "@/src/hooks/user.hook";
import { getAllMyGroups } from "@/src/services/GroupService";
import { getAllMyRecipes, getAllRecipes } from "@/src/services/Recipe";
import { IGroup, IUser, TGroupMeta } from "@/src/types";
import {
  Avatar,
  Button,
  Card,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import GroupLeftSidebar from "./GroupLeftSidebar";
import GroupManagementCard from "./GroupManagementCard";

export default function GroupsPageFeed({ groupId }: { groupId?: string }) {
  const [activeTab, setActiveTab] = useState("Timeline");
  const { user: userData, isLoading } = useUser();
  const { data: user, isPending } = useGetUser(userData?.email!);
  const { mutate: unFollowing } = useUpdateUnfollowing(user?.email!);
  const [recipe, setRecipe] = useState();
  const [allRecipe, setAllRecipe] = useState();
  const [revalidateProfile, setRevalidateProfile] = useState(false);
  const [allMyGroups, setAllMyGroups] = useState<TGroupMeta>();
  const [myGroupimg, setMyGroupImg] = useState<string>(
    allMyGroups?.result[0]?.image[0] || ""
  );
  const [myGroupName, setMyGroupName] = useState<string>(
    allMyGroups?.result[0]?.name || ""
  );
  const [myCurrentGroup, setMyCurrentGroup] = useState<IGroup>(
    allMyGroups?.result[0]!
  );

  console.log(myCurrentGroup);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: allRecipe } = await getAllMyRecipes([
          { name: "sort", value: "-createdAt" },
          { name: "contentType", value: "free" },
        ]);
        setRecipe(allRecipe);

        const { data: recipes } = await getAllRecipes([
          { name: "sort", value: "-createdAt" },
        ]);
        setAllRecipe(recipes);

        const { data: allGroups } = await getAllMyGroups([
          { name: "sort", value: "-createdAt" },
        ]);
        setAllMyGroups(allGroups);
        if (allGroups) {
          setMyGroupName(allGroups?.result[0]?.name);
          setMyGroupImg(allGroups?.result[0]?.image[0]);
          setMyCurrentGroup(allGroups?.result[0]);

          if (groupId) {
            setMyGroupName(
              allGroups?.result?.find((group: IGroup) => group?._id === groupId)
                ?.name
            );
            setMyGroupImg(
              allGroups?.result?.find((group: IGroup) => group?._id === groupId)
                ?.image[0]
            );
            setMyCurrentGroup(
              allGroups?.result?.find((group: IGroup) => group?._id === groupId)
            );
          }
        }
      } catch (error) {
        console.log("Recipe fetch failed", error);
      }
    };

    if (revalidateProfile) {
      setRevalidateProfile(false);
    }

    fetchData();
  }, [revalidateProfile, groupId]);

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
                setRevalidateProfile={setRevalidateProfile}
                revalidateProfile={revalidateProfile}
              />
              <div className=" mb-8">
                <HomePageFeedCard
                  recipe={recipe!}
                  setRevalidateProfile={setRevalidateProfile}
                  revalidateProfile={revalidateProfile}
                />
              </div>
            </div>
          </div>
        );
      case "Members":
        return (
          <div className="container mx-auto max-w-7xl pt-4 flex-grow min-h-screen mt-4">
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4">
              {myCurrentGroup?.members?.map(
                (following: IUser, index: number) => (
                  <Card
                    className="shadow-lg w-full h-48 flex flex-col justify-center items-center"
                    key={index}
                  >
                    <div className="h-[100px] w-[100px] ">
                      <Image
                        src={following.image}
                        width={100}
                        height={100}
                        alt="User"
                        className="h-full w-full border-2 border-primary-500 rounded-lg"
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
                )
              )}
            </div>
          </div>
        );
      case "Events":
        return (
          <div className="container mx-auto max-w-7xl pt-4 mt-4 flex-grow min-h-screen">
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4">
              <p className="text-xl">No events running.</p>
            </div>
          </div>
        );
      case "About":
        return (
          <div className="container mx-auto max-w-7xl pt-4 mt-4 flex-grow min-h-screen">
            {<div className="text-xl">{"About not updated yet!"}</div>}
          </div>
        );

      case "Create Group":
        return (
          <div className="container mx-auto max-w-7xl pt-4 flex-grow min-h-screen">
            <div className="text-xl">
              <GroupManagementCard title="Add" />
            </div>
          </div>
        );

      case "Update Group":
        return (
          <div className="container mx-auto max-w-7xl pt-4 flex-grow min-h-screen">
            <div className="text-xl">
              <GroupManagementCard title="Update" group={myCurrentGroup} />
            </div>
          </div>
        );

      case "Groups":
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
          <GroupLeftSidebar setActiveTab={setActiveTab} />
          <div className="sticky top-20">
            <HomePageRecentPost title="Latest Recipes" recipes={allRecipe!} />
          </div>
        </div>

        <div className="md:col-span-2 p-4 gap-4">
          <Card className="bg-default-100 h-56 rounded-sm">
            <CardHeader className="p-4 flex justify-between">
              <div>
                <div className="flex gap-8">
                  <Image
                    width={100}
                    height={100}
                    src={myGroupimg}
                    alt="group"
                    className="w-20 h-20 object-cover rounded-full"
                  />
                  <div>
                    <h2 className="text-xl font-bold mt-2">{myGroupName}</h2>
                    {myCurrentGroup && (
                      <p className="text-sm">
                        {myCurrentGroup?.members?.length > 9
                          ? myCurrentGroup?.members?.length
                          : `0${myCurrentGroup?.members?.length}`}{" "}
                        Members
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex p-4">
                  {myCurrentGroup?.members
                    ?.slice(0, 3)
                    ?.map((member: IUser) => (
                      <Avatar
                        className="ml-[-10px] "
                        key={member?._id}
                        src={member?.image}
                        isBordered
                      />
                    ))}
                  {myCurrentGroup?.members?.length > 3 && (
                    <div className="relative flex items-center justify-center ml-[-10px]">
                      <Avatar
                        className="bg-primary-500 text-primary-500"
                        src={""} // Ensure a valid src or use a fallback
                        isBordered
                      />
                      <p className="absolute   text-white text-xs font-semibold px-2 py-1 rounded-full">
                        +{myCurrentGroup && myCurrentGroup?.members?.length - 3}
                      </p>
                    </div>
                  )}
                  {myCurrentGroup && (
                    <div className="flex text-sm items-center h-12 ml-4">
                      <div>
                        <span className="">
                          <span className="">{`${myCurrentGroup?.members[0]?.name}`}</span>
                          {myCurrentGroup?.members?.length > 1 && (
                            <span>,</span>
                          )}
                        </span>
                        {myCurrentGroup?.members[1] && (
                          <span className="ml-1">{`${myCurrentGroup?.members[1]?.name}`}</span>
                        )}
                        {myCurrentGroup?.members?.length > 2 && (
                          <span>
                            {` and ${myCurrentGroup?.members?.length - 2}`}
                            {""}
                          </span>
                        )}
                        <span className="ml-1">joined group</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div></div>
              </div>
            </CardHeader>

            <CardFooter>
              {/* Navigation Tabs */}
              <div className="absolute bottom-0 left-0 w-full">
                <div className="flex justify-center  px-6 border border-gray-200">
                  {["Timeline", "Members", "Events", "About"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2  font-semibold text-base ${
                        activeTab === tab
                          ? "text-secondary-600 font-bold bg-white rounded-se-3xl"
                          : "text-primary-500"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            </CardFooter>
          </Card>

          <div className="">{renderContent()}</div>
        </div>

        <div className="hidden flex-col md:flex md:col-span-1 p-4 w-full gap-4">
          <HomePageMyGroups />
          <div className="sticky top-20">
            <HomePageRecentPost title="My Recent Posts" recipes={recipe!} />
          </div>
        </div>
      </div>
    </div>
  );
}
