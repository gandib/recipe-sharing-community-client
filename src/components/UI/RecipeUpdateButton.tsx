"use client";
import { useUser } from "@/src/context/user.provider";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { use } from "react";

const RecipeUpdateButton = ({ id }: { id: string }) => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  const handleUpdate = () => {
    router.push(
      `${user?.role === "user" ? `/user-dashboard/update-recipe/${id}` : `/admin-dashboard/update-recipe/${id}`}`
    );
  };

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <Button size="sm" onClick={() => handleUpdate()}>
      Update
    </Button>
  );
};

export default RecipeUpdateButton;
