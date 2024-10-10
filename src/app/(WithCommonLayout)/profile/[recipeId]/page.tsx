import { getSingleRecipe } from "@/src/services/Recipe";
import RecipeDetailCard from "@/src/components/UI/RecipeDetailCard";

const DetailRecipe = async ({ params }: { params: { recipeId: string } }) => {
  const { data } = await getSingleRecipe(params.recipeId);

  return (
    <div>
      <RecipeDetailCard recipe={data} />
    </div>
  );
};

export default DetailRecipe;
