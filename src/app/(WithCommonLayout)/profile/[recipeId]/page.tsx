import { getSingleRecipe } from "@/src/services/Recipe";
import RecipeDetailCard from "@/src/components/UI/RecipeDetailCard";

const DetailRecipe = async ({ params }: { params: { recipeId: string } }) => {
  const { data } = await getSingleRecipe(params.recipeId);
  console.log(params.recipeId);
  console.log(data);
  return (
    <div>
      <RecipeDetailCard recipe={data} />
    </div>
  );
};

export default DetailRecipe;
