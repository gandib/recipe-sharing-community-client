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
import { getAllGroups, getAllMyGroups } from "@/src/services/GroupService";
import { getAllMyRecipes, getAllRecipes } from "@/src/services/Recipe";
import { IGroup, IRecipe, IUser, TGroupMeta, TRecipeMeta } from "@/src/types";
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

export default function GroupsPageFeed({
  groupId,
  myGroups,
  recipes,
  groups,
}: {
  groupId?: string;
  myGroups: TGroupMeta;
  recipes: TRecipeMeta;
  groups: TGroupMeta;
}) {
  const [activeTab, setActiveTab] = useState("Timeline");
  const { user: userData, isLoading } = useUser();
  const { data: user, isPending } = useGetUser(userData?.email!);
  const { mutate: unFollowing } = useUpdateUnfollowing(user?.email!);
  const [revalidateProfile, setRevalidateProfile] = useState(false);
  const [allMyGroups, setAllMyGroups] = useState<TGroupMeta>();
  const [allGroups, setAllGroups] = useState<TGroupMeta>(groups);
  const [myGroupImg, setMyGroupImg] = useState<string>(
    allMyGroups?.result[0]?.image[0] || ""
  );
  const [myGroupName, setMyGroupName] = useState<string>(
    allMyGroups?.result[0]?.name || ""
  );
  const [myCurrentGroup, setMyCurrentGroup] = useState<IGroup>(
    allMyGroups?.result[0]!
  );
  const [recipe, setRecipe] = useState<IRecipe[]>(allGroups?.result[0]?.posts!);
  const [allRecipe, setAllRecipe] = useState(recipes?.result);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: recipes } = await getAllRecipes([
          { name: "sort", value: "-createdAt" },
        ]);
        setAllRecipe(recipes?.result || []);

        const { data: groups } = await getAllGroups([
          { name: "sort", value: "-createdAt" },
        ]);
        if (groups) {
          setAllGroups(groups);
        } else {
          console.error("getAllGroups API returned undefined:", groups);
        }

        const { data: myGroups } = await getAllMyGroups([
          { name: "sort", value: "-createdAt" },
        ]);

        if (myGroups?.result && myGroups?.result?.length > 0) {
          setAllMyGroups(myGroups);
          setMyGroupName(myGroups.result[0]?.name || "");
          setMyGroupImg(myGroups.result[0]?.image?.[0] || "");
          setMyCurrentGroup(myGroups.result[0]);
          setRecipe(myGroups.result[0]?.posts || []);
        } else {
          console.warn("User is not part of any groups:", myGroups);
          setAllMyGroups({
            meta: { page: 0, limit: 0, total: 0, totalPage: 0 },
            result: [],
          });
          setRecipe([]);
        }

        if (groupId) {
          const selectedGroup = myGroups?.result?.find(
            (group: IGroup) => group?._id === groupId
          );

          if (selectedGroup) {
            setMyGroupName(selectedGroup.name || "");
            setMyGroupImg(selectedGroup.image?.[0] || "");
            setMyCurrentGroup(selectedGroup);
            setRecipe(selectedGroup.posts || []);
          } else {
            console.warn("Group not found for ID:", groupId);
          }
        }
      } catch (error) {
        console.error("Recipe fetch failed:", error);
      }
    };

    if (revalidateProfile) {
      setRevalidateProfile(false);
    }

    fetchData();
  }, [revalidateProfile]);

  useEffect(() => {
    if (myGroups?.result && myGroups?.result?.length > 0) {
      setAllMyGroups(myGroups);
      setMyGroupName(myGroups.result[0]?.name || "");
      setMyGroupImg(myGroups.result[0]?.image?.[0] || "");
      setMyCurrentGroup(myGroups.result[0]);
      setRecipe(myGroups.result[0]?.posts || []);
    } else {
      console.warn("User is not part of any groups:", myGroups);
      setAllMyGroups({
        meta: { page: 0, limit: 0, total: 0, totalPage: 0 },
        result: [],
      });
      setRecipe([]);
    }

    if (groupId) {
      const selectedGroup = myGroups?.result?.find(
        (group: IGroup) => group?._id === groupId
      );

      if (selectedGroup) {
        setMyGroupName(selectedGroup.name || "");
        setMyGroupImg(selectedGroup.image?.[0] || "");
        setMyCurrentGroup(selectedGroup);
        setRecipe(selectedGroup.posts || []);
      } else {
        console.warn("Group not found for ID:", groupId);
      }
    }
  }, [groupId]);

  const handleUnFollowing = (followingId: string) => {
    const unfollowingData = {
      id: user?._id,
      data: {
        following: followingId,
      },
    };

    unFollowing(unfollowingData);
  };

  if (isLoading) {
    <p>Loading...</p>;
  }

  const sortedRecipe =
    Array.isArray(recipe) && recipe.length > 0
      ? [...recipe].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      : [];

  if (sortedRecipe.length > 1) {
    const first = sortedRecipe[0];
    const last = sortedRecipe[sortedRecipe.length - 1];

    sortedRecipe[0] = last;
    sortedRecipe[sortedRecipe.length - 1] = first;
  }

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
                groupId={myCurrentGroup?._id}
              />
              <div className=" mb-8">
                {!recipe?.length && (
                  <p>No posts found related to this group!</p>
                )}
                <HomePageFeedCard
                  recipe={sortedRecipe}
                  groupId={myCurrentGroup?._id!}
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
                    className="shadow md:shadow-md w-full h-48 flex flex-col justify-center items-center"
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
          <div className="container mx-auto max-w-7xl pt-4 flex-grow min-h-screen mt-4">
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4">
              {allGroups?.result?.map((group: IGroup, index: number) => (
                <Card
                  className="shadow md:shadow-md rounded-sm border w-full h-52 flex flex-col justify-center items-center"
                  key={index}
                >
                  <div className="h-[120px] w-full ">
                    <Image
                      src={group.image[0]}
                      width={100}
                      height={100}
                      alt="User"
                      className="h-full w-full border-primary-500 "
                    />
                  </div>
                  <p className="my-2 font-semibold">{group.name}</p>
                  <Button
                    size="sm"
                    className=" py-3 my-2 font-semibold"
                    onPress={() => handleUnFollowing(group._id)}
                    color="primary"
                    variant="flat"
                  >
                    Join Group
                  </Button>
                </Card>
              ))}
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
          <Card className="bg-default-100 h-64 rounded-sm">
            <CardHeader className="p-4 flex justify-between">
              <div>
                <div className="flex gap-8">
                  <Image
                    width={100}
                    height={100}
                    src={myGroupImg}
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
                    <div className="relative flex items-center justify-center ml-[-10px] mb-1.5">
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
          <HomePageMyGroups allGroups={myGroups} />
          <div className="sticky top-20">
            <HomePageRecentPost
              title="My Recent Posts"
              recipes={sortedRecipe}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
