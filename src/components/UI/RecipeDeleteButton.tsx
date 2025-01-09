"use client";

import { useUser } from "@/src/context/user.provider";
import { useDeleteRecipe } from "@/src/hooks/recipe.hook";
import { Button } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

const RecipeDeleteButton = ({
  id,
  setLoading,
}: {
  id: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user, isLoading } = useUser();
  const {
    mutate: deleteRecipe,
    isPending,
    isSuccess,
  } = useDeleteRecipe(user?.email!);
  const handleDelete = () => {
    deleteRecipe(id);
    setLoading(true);
  };
  if (isSuccess) {
    setLoading(false);
  }

  if (isLoading || isPending) {
    <p>Loading...</p>;
  }

  return (
    <Button size="sm" onClick={() => handleDelete()} className="bg-danger-500">
      Delete
    </Button>
  );
};

export default RecipeDeleteButton;
