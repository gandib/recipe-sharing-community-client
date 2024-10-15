import MyRecipeCard from "@/src/components/UI/MyRecipeCard";
import { getAllMyRecipes, getAllMyTag } from "@/src/services/Recipe";

const MyRecipe = async () => {
  const { data: myRecipe } = await getAllMyRecipes([
    { name: "sort", value: "-upvote" },
    { name: "limit", value: 10 },
  ]);
  const { data: allMyTag } = await getAllMyTag();

  return (
    <div>
      <MyRecipeCard recipe={myRecipe} tags={allMyTag} />
    </div>
  );
};

export default MyRecipe;
