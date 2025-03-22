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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IUser } from "@/src/types";
import {
  useDeleteUser,
  useGetAllAdmin,
  useUpdateUserStatus,
} from "@/src/hooks/user.hook";
import { useUser } from "@/src/context/user.provider";

const AllAdmin = () => {
  const [email, setEmail] = useState("");
  const { user, isLoading } = useUser();
  const { data } = useGetAllAdmin(email);
  const { mutate: statusUpdate } = useUpdateUserStatus(email);
  const { mutate: deleteUser } = useDeleteUser(email);
  const router = useRouter();

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

  const handleUpdate = (email: string) => {
    router.push(`/admin-dashboard/update-admin/${email}`);
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
        </TableHeader>
        <TableBody>
          {data?.data && Array.isArray(data.data) ? (
            data.data.map((userData: IUser) => (
              <TableRow key={userData._id}>
                <TableCell>{userData.name}</TableCell>
                <TableCell>{userData.email}</TableCell>
                <TableCell className="flex justify-between">
                  <div className="flex gap-4">
                    <Button
                      color="warning"
                      size="sm"
                      onPress={() =>
                        handleStatus(
                          userData?.email,
                          userData?._id,
                          userData?.status,
                        )
                      }
                    >
                      {userData.status === "unblocked"
                        ? "blocked"
                        : "unblocked"}
                    </Button>
                    <Button
                      color="primary"
                      size="sm"
                      onPress={() => handleUpdate(userData?.email)}
                    >
                      UPDATE
                    </Button>
                    <Button
                      color="danger"
                      size="sm"
                      onPress={() =>
                        handleDelete(userData?.email, userData?._id)
                      }
                    >
                      DELETE
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>No data available</TableCell>
              <TableCell>No data</TableCell>
              <TableCell>No Data</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllAdmin;
