import UserDashboardCard from "@/src/components/UI/UserDashboardCard";
import { getAllMyRecipes, getAllMyTag } from "@/src/services/Recipe";

const UserDashboard = async () => {
  const { data: myRecipe } = await getAllMyRecipes([
    { name: "sort", value: "-upvote" },
  ]);

  const { data: allMyTag } = await getAllMyTag();

  return (
    <div>
      <UserDashboardCard recipe={myRecipe} tags={allMyTag} />
    </div>
  );
};

export default UserDashboard;
