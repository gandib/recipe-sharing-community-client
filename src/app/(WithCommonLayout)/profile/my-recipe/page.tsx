import MyRecipeCard from "@/src/components/UI/MyRecipeCard";
import { getAllMyRecipes } from "@/src/services/Recipe";

const MyRecipe = async () => {
  const { data: myRecipe } = await getAllMyRecipes([
    { name: "sort", value: "-upvote" },
  ]);
  console.log(myRecipe);
  return (
    <div>
      <MyRecipeCard recipe={myRecipe?.result} />
    </div>
  );
};

export default MyRecipe;
