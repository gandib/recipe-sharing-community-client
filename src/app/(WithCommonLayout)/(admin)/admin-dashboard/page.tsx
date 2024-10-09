import AdminDashboardCard from "@/src/components/UI/AdminDashboardCard";
import { getAllMyRecipes, getAllRecipes } from "@/src/services/Recipe";

const AdminDashboard = async () => {
  const { data: allRecipe } = await getAllRecipes([
    { name: "sort", value: "-upvote" },
  ]);

  return (
    <div>
      <AdminDashboardCard recipe={allRecipe?.result} />
    </div>
  );
};

export default AdminDashboard;
