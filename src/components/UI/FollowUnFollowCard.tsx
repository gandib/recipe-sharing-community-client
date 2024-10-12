"use client";

import { useUser } from "@/src/context/user.provider";
import {
  useGetUser,
  useGetUserById,
  useUpdateFollowing,
  useUpdateUnfollowing,
} from "@/src/hooks/user.hook";
import { Button } from "@nextui-org/button";
import { toast } from "sonner";

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
        {userDataById?.data?.name}
        {data?.data?._id !== userDataById?.data?._id && ": "}
        {data?.data?._id !== userDataById?.data?._id && (
          <Button
            onClick={() =>
              handleFollowUnfollow(
                data?.data?.following?.some(
                  (following: any) => following._id === userId
                )
                  ? "following"
                  : "follow"
              )
            }
            size="sm"
            variant="light"
            className="text-green-500 text-sm"
          >
            {data?.data?.following?.some(
              (following: any) => following._id === userId
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
