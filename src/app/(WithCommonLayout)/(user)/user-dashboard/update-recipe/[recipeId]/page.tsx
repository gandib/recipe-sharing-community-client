import RecipeCard from "@/src/components/UI/RecipeCard";
import { getSingleRecipe } from "@/src/services/Recipe";

const UpdateRecipe = async ({ params }: { params: { recipeId: string } }) => {
  const { data } = await getSingleRecipe(params.recipeId);

  return (
    <div>
      <RecipeCard
        id={params.recipeId}
        singleRecipeData={data}
        title="Update Recipe"
      />
    </div>
  );
};

export default UpdateRecipe;
