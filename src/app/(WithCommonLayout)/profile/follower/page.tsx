"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useUser } from "@/src/context/user.provider";
import { useGetUser } from "@/src/hooks/user.hook";
import { IUser } from "@/src/types";

const Follower = () => {
  const { user, isLoading } = useUser();
  const { data } = useGetUser(user?.email!);

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>
            FOLLOWER
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
    </div>
  );
};

export default Follower;
