"use client";

import { Button } from "@nextui-org/react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { useUser } from "@/src/context/user.provider";
import { useUpdateRecipeStatus } from "@/src/hooks/recipe.hook";
import { IRecipe } from "@/src/types";

const StatusChangeCard = ({ recipe }: { recipe: IRecipe[] }) => {
  const { user, isLoading } = useUser();
  const { mutate: statusChange } = useUpdateRecipeStatus(user?.email!);

  const handleStatus = (id: string, status: string) => {
    const statusData = {
      id: id,
      data: {
        status: status,
      },
    };

    statusChange(statusData);
  };

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <div>
      <Table isStriped aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Title</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {recipe && Array.isArray(recipe) ? (
            recipe.map((data: IRecipe) => (
              <TableRow key={data._id}>
                <TableCell>{data.title}</TableCell>
                <TableCell className="flex justify-between gap-2">
                  <Button
                    className="w-24"
                    color="primary"
                    size="sm"
                    variant="flat"
                    onPress={() =>
                      handleStatus(
                        data?._id,
                        data?.status === "published"
                          ? "unpublished"
                          : "published",
                      )
                    }
                  >
                    {data?.status === "published" ? "unpublished" : "published"}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>No data available</TableCell>
              <TableCell>No data</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default StatusChangeCard;
