import MyRecipeCard from "@/src/components/UI/MyRecipeCard";
import { getAllMyRecipes, getAllMyTag } from "@/src/services/Recipe";

const MyRecipe = async () => {
  const { data: myRecipe } = await getAllMyRecipes([
    { name: "sort", value: "-upvote" },
  ]);
  const { data: allMyTag } = await getAllMyTag();
  console.log({ allMyTag });
  console.log(myRecipe);
  return (
    <div>
      <MyRecipeCard recipe={myRecipe} tags={allMyTag} />
    </div>
  );
};

export default MyRecipe;
