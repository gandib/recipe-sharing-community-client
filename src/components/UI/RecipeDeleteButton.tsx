"use client";

import { useUser } from "@/src/context/user.provider";
import { useDeleteRecipe } from "@/src/hooks/recipe.hook";
import { Button } from "@nextui-org/button";

const RecipeDeleteButton = ({ id }: { id: string }) => {
  const { user, isLoading } = useUser();
  const { mutate: deleteRecipe, isPending } = useDeleteRecipe(user?.email!);
  const handleDelete = () => {
    deleteRecipe(id);
  };

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
