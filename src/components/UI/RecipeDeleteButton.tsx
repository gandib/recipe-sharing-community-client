"use client";

import { useUser } from "@/src/context/user.provider";
import { useDeleteRecipe } from "@/src/hooks/recipe.hook";
import { Button } from "@nextui-org/button";

const RecipeDeleteButton = ({ id }: { id: string }) => {
  const { user, isLoading } = useUser();
  const { mutate: deleteRecipe } = useDeleteRecipe(user?.email!);
  const handleDelete = () => {
    console.log(id);
    deleteRecipe(id);
  };

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <Button size="sm" onClick={() => handleDelete()} className="bg-danger-500">
      Delete
    </Button>
  );
};

export default RecipeDeleteButton;
