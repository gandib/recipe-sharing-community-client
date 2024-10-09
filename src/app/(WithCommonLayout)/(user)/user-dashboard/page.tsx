import UserDashboardCard from "@/src/components/UI/UserDashboardCard";
import { getAllMyRecipes } from "@/src/services/Recipe";

const UserDashboard = async () => {
  const { data: myRecipe } = await getAllMyRecipes([
    { name: "sort", value: "-upvote" },
  ]);
  console.log({ myRecipe });
  return (
    <div>
      <UserDashboardCard recipe={myRecipe?.result} />
    </div>
  );
};

export default UserDashboard;
