import UserDashboardCard from "@/src/components/UI/UserDashboardCard";
import { getAllMyRecipes, getAllMyTag } from "@/src/services/Recipe";

const UserDashboard = async () => {
  const { data: myRecipe } = await getAllMyRecipes([
    { name: "sort", value: "-upvote" },
    { name: "limit", value: 10 },
  ]);

  const { data: allMyTag } = await getAllMyTag();

  return (
    <div>
      <UserDashboardCard recipe={myRecipe} tags={allMyTag} />
    </div>
  );
};

export default UserDashboard;
