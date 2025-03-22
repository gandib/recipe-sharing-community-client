"use client";

import { Button } from "@nextui-org/react";
import { toast } from "sonner";
import { useUser } from "@/src/context/user.provider";
import {
  useGetUser,
  useGetUserById,
  useUpdateFollowing,
  useUpdateUnfollowing,
} from "@/src/hooks/user.hook";

const FollowUnFollowCard = ({ userId }: { userId: string }) => {
  const { user, isLoading } = useUser();
  const { data } = useGetUser(user?.email!);
  const { data: userDataById } = useGetUserById(userId);
  const { mutate: updateFollower } = useUpdateFollowing(user?.email!);
  const { mutate: updateUnFollowing } = useUpdateUnfollowing(user?.email!);

  const handleFollowUnfollow = (followUnfollow: string) => {
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
    <div>
      <h1>
        {userDataById?.data?.name ? userDataById?.data?.name : "Deleted User"}
        {data?.data?._id !== userDataById?.data?._id &&
          userDataById?.data?.name &&
          ": "}
        {data?.data?._id !== userDataById?.data?._id &&
          userDataById?.data?.name && (
            <Button
              className="text-green-500 text-sm"
              size="sm"
              variant="light"
              onPress={() =>
                handleFollowUnfollow(
                  data?.data?.following?.some(
                    (following: any) => following._id === userId,
                  )
                    ? "following"
                    : "follow",
                )
              }
            >
              {data?.data?.following?.some(
                (following: any) => following._id === userId,
              )
                ? "following"
                : "follow"}
            </Button>
          )}
      </h1>
    </div>
  );
};

export default FollowUnFollowCard;
