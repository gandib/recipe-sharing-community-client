import RecipeCard from "@/src/components/UI/RecipeCard";

const UpdateRecipe = ({ params }: { params: { recipeId: string } }) => {
  return (
    <div>
      <RecipeCard title="Update Recipe" id={params.recipeId} />
    </div>
  );
};

export default UpdateRecipe;
