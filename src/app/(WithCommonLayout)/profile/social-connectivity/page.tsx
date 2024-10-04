"use client";
import { useUser } from "@/src/context/user.provider";
import { useGetUser, useUpdateUnfollowing } from "@/src/hooks/user.hook";
import { IUser } from "@/src/types";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";

const SocialConnectivity = () => {
  const { user } = useUser();
  const { data } = useGetUser(user?.email!);
  const { mutate: unFollowing } = useUpdateUnfollowing(user?.email!);

  const handleUnFollowing = (followingId: string) => {
    const unfollowingData = {
      id: user?._id,
      data: {
        following: followingId,
      },
    };

    unFollowing(unfollowingData);
  };

  return (
    <div className="grid md:grid-cols-2 gap-2">
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>
            FOLLOWER{" "}
            <span className="text-primary-500 font-bold ml-2">
              {data?.data?.follower?.length}
            </span>
          </TableColumn>
        </TableHeader>
        <TableBody>
          {data?.data?.follower?.map((follower: IUser, index: number) => (
            <TableRow key={index}>
              <TableCell>{follower.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>
            FOLLOWING
            <span className="text-primary-500 font-bold ml-2">
              {data?.data?.following?.length}
            </span>
          </TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {data?.data?.following?.map((following: IUser, index: number) => (
            <TableRow key={index}>
              <TableCell>{following.name}</TableCell>
              <TableCell
                className="cursor-pointer hover:text-primary-500"
                onClick={() => handleUnFollowing(following._id)}
              >
                Unfollow
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SocialConnectivity;
