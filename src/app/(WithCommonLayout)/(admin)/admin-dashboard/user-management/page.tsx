"use client";
import { Button } from "@nextui-org/react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useState } from "react";
import { useUser } from "@/src/context/user.provider";
import {
  useDeleteUser,
  useGetAllUser,
  useUpdateUserStatus,
} from "@/src/hooks/user.hook";
import { IUser } from "@/src/types";

const UserManagement = () => {
  const [email, setEmail] = useState("");
  const { user, isLoading } = useUser();
  const { data } = useGetAllUser(email);
  const { mutate: statusUpdate } = useUpdateUserStatus(email);
  const { mutate: deleteUser } = useDeleteUser(email);

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

  const handleDelete = (email: string, id: string) => {
    setEmail(email);
    const userDeletedData = {
      id: id,
    };

    deleteUser(userDeletedData);
  };

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <div>
      <Table isStriped aria-label="Example static collection table">
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
              <TableCell className="flex justify-between">
                <div className="flex gap-4">
                  <Button
                    onPress={() =>
                      handleStatus(
                        userData?.email,
                        userData?._id,
                        userData?.status
                      )
                    }
                    size="sm"
                    // className="bg-primary-500 text-white"
                    color="warning"
                  >
                    {userData.status === "unblocked" ? "blocked" : "unblocked"}
                  </Button>
                  <Button
                    onPress={() => handleDelete(userData?.email, userData?._id)}
                    size="sm"
                    // className="bg-primary-500 text-white"
                    color="danger"
                  >
                    DELETE
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManagement;
