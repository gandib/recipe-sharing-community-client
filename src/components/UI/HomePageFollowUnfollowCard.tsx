"use client";

import { Button } from "@nextui-org/react";
import { toast } from "sonner";
import {
  useGetUser,
  useUpdateFollowing,
  useUpdateUnfollowing,
} from "@/src/hooks/user.hook";
import { IUser } from "@/src/types";
import { useUser } from "@/src/context/user.provider";

const HomePageFollowUnFollowCard = ({ userData }: { userData: IUser }) => {
  const { user, isLoading } = useUser();
  const { data } = useGetUser(user?.email!);
  const { mutate: updateFollower } = useUpdateFollowing(user?.email!);
  const { mutate: updateUnFollowing } = useUpdateUnfollowing(user?.email!);

  const handleFollowUnfollow = (followUnfollow: string) => {
    if (!user?._id) {
      return toast("You are not logged in!");
    }
    if (followUnfollow === "follow") {
      const followData = {
        id: userData?._id,
        data: {
          follower: user?._id,
        },
      };

      updateFollower(followData);
    } else {
      const unFollowData = {
        id: user?._id,
        data: {
          following: userData?._id,
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
        {data?.data?._id !== userData?._id && userData?.name && (
          <Button
            className="text-green-500 text-sm"
            size="sm"
            variant="light"
            onPress={() =>
              handleFollowUnfollow(
                data?.data?.following?.some(
                  (following: any) => following._id === userData?._id
                )
                  ? "following"
                  : "follow"
              )
            }
          >
            {data?.data?.following?.some(
              (following: any) => following._id === userData?._id
            )
              ? "following"
              : "follow"}
          </Button>
        )}
      </h1>
    </div>
  );
};

export default HomePageFollowUnFollowCard;
