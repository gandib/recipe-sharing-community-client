"use client";

import { useUser } from "@/src/context/user.provider";
import { useUpdateRecipeStatus } from "@/src/hooks/recipe.hook";
import { IRecipe } from "@/src/types";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";

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
      <div className="">
        <Card aria-label="Example static collection table">
          <div className="grid grid-cols-2 m-6">
            <h1 className="col-span-1">Title</h1>
            <h1 className="col-span-1">Action</h1>
          </div>
          {recipe?.map((data: IRecipe) => (
            <CardBody key={data._id}>
              <div className="grid grid-cols-2 mx-6">
                <h1 className="col-span-1">{data?.title}</h1>
                <div className="col-span-1">
                  <Button
                    onClick={() =>
                      handleStatus(
                        data?._id,
                        data?.status === "published"
                          ? "unpublished"
                          : "published"
                      )
                    }
                    variant="flat"
                  >
                    {data?.status === "published" ? "unpublished" : "published"}
                  </Button>
                </div>
              </div>
            </CardBody>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default StatusChangeCard;
