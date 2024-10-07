"use client";
import { useUser } from "@/src/context/user.provider";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { use } from "react";

const RecipeUpdateButton = ({ id }: { id: string }) => {
  const { user } = useUser();
  const router = useRouter();
  const handleUpdate = () => {
    console.log(id);
    router.push(
      `${user?.role === "user" ? `/user-dashboard/update-recipe/${id}` : `/admin-dashboard/update-recipe/${id}`}`
    );
  };
  return <Button onClick={() => handleUpdate()}>Update</Button>;
};

export default RecipeUpdateButton;
