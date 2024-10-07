"use client";

import { Button } from "@nextui-org/button";

const RecipeDeleteButton = ({ id }: { id: string }) => {
  const handleDelete = () => {
    console.log(id);
  };
  return (
    <Button onClick={() => handleDelete()} className="bg-danger-500">
      Delete
    </Button>
  );
};

export default RecipeDeleteButton;
