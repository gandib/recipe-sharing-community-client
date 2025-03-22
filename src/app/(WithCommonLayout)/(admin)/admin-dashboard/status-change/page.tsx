export const dynamic = "force-dynamic";
import StatusChangeCard from "@/src/components/UI/StatusChangeCard";
import { getAllRecipeForStatusChange } from "@/src/services/Recipe";

const StatusChange = async () => {
  //   const { data: allRecipe } = await getAllRecipes([
  //     { name: "sort", value: "-upvote" },
  //   ]);
  const { data: allRecipe } = await getAllRecipeForStatusChange();

  return (
    <div>
      <StatusChangeCard recipe={allRecipe} />
    </div>
  );
};

export default StatusChange;
