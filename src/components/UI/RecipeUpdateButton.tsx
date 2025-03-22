"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useUser } from "@/src/context/user.provider";

const RecipeUpdateButton = ({ id }: { id: string }) => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  const handleUpdate = () => {
    router.push(
      `${user?.role === "user" ? `/user-dashboard/update-recipe/${id}` : `/admin-dashboard/update-recipe/${id}`}`,
    );
  };

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <Button size="sm" onPress={() => handleUpdate()}>
      Update
    </Button>
  );
};

export default RecipeUpdateButton;
