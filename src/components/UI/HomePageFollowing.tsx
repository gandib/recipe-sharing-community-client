"use client";

import { useUser } from "@/src/context/user.provider";
import {
  useGetUser,
  useGetUserById,
  useUpdateFollowing,
  useUpdateUnfollowing,
} from "@/src/hooks/user.hook";
import { Button, User } from "@nextui-org/react";
import { toast } from "sonner";

const HomePageFollowing = () => {
  const { user, isLoading } = useUser();
  const { data } = useGetUser(user?.email!);
  // const { data: userDataById } = useGetUserById(userId);
  const { mutate: updateFollower } = useUpdateFollowing(user?.email!);
  const { mutate: updateUnFollowing } = useUpdateUnfollowing(user?.email!);

  const handleFollowUnfollow = (followUnfollow: string, userId: string) => {
    if (!user?._id) {
      return toast("You are not logged in!");
    }
    if (followUnfollow === "follow") {
      const followData = {
        id: userId,
        data: {
          follower: user?._id,
        },
      };
      console.log(followData);
      updateFollower(followData);
    } else {
      const unFollowData = {
        id: user?._id,
        data: {
          following: userId,
        },
      };
      updateUnFollowing(unFollowData);
    }
  };

  if (isLoading) {
    <p>Loading...</p>;
  }
  return (
    <div className="bg-gray-100 rounded p-6 sticky top-20">
      <h1 className="text-base text-gray-600 font-bold mb-6">
        Who's following
      </h1>
      {data?.data?.follower?.length < 1 && "No follower found"}
      {data?.data?.follower?.map(
        (follower: {
          _id: string;
          image: any;
          membership: string;
          name: string;
        }) => (
          <div
            key={follower._id}
            className="flex text-gray-700 justify-between pb-2"
          >
            <div className="flex">
              <User
                avatarProps={{
                  src: `${follower.image}`,
                }}
                description={follower.membership}
                name={follower.name}
              />
            </div>

            <Button
              onPress={() =>
                handleFollowUnfollow(
                  data?.data?.following?.some(
                    (following: any) => following._id === follower._id
                  )
                    ? "following"
                    : "follow",
                  follower._id
                )
              }
              size="sm"
              variant="light"
              className="text-green-500 text-sm"
            >
              {data?.data?.following?.some(
                (following: any) => following._id === follower._id
              )
                ? "following"
                : "follow"}
            </Button>
          </div>
        )
      )}
    </div>
  );
};

export default HomePageFollowing;
