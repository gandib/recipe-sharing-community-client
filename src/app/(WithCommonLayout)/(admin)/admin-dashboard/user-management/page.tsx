"use client";
import { useUser } from "@/src/context/user.provider";
import {
  useGetAllUser,
  useGetUser,
  useUpdateUserStatus,
} from "@/src/hooks/user.hook";
import { IUser } from "@/src/types";
import { Button } from "@nextui-org/button";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { useState } from "react";

const UserManagement = () => {
  const [email, setEmail] = useState("");
  const { user } = useUser();
  const { data } = useGetAllUser(email);
  const { mutate: statusUpdate } = useUpdateUserStatus(email);

  const handleStatus = (email: string, id: string, status: string) => {
    setEmail(email);
    const userStatusData = {
      id: user?._id,
      data: {
        id: id,
        status: status === "blocked" ? "unblocked" : "blocked",
      },
    };
    statusUpdate(userStatusData);
  };

  return (
    <div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>ACTION</TableColumn>
          {/* <TableColumn>ACTION</TableColumn> */}
        </TableHeader>
        <TableBody>
          {data?.data?.map((userData: IUser) => (
            <TableRow key={userData._id}>
              <TableCell>{userData.name}</TableCell>
              <TableCell>{userData.email}</TableCell>
              <TableCell className="flex justify-evenly">
                <Button
                  onClick={() =>
                    handleStatus(
                      userData?.email,
                      userData?._id,
                      userData?.status
                    )
                  }
                  size="sm"
                  className="bg-primary-500 text-white"
                >
                  {userData.status === "unblocked" ? "blocked" : "unblocked"}
                </Button>
                <Button size="sm" className="bg-primary-500 text-white">
                  DELETE
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManagement;
