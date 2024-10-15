import AdminDashboardCard from "@/src/components/UI/AdminDashboardCard";
import { getAllRecipes, getAllTag } from "@/src/services/Recipe";

const AdminDashboard = async () => {
  const { data: allRecipe } = await getAllRecipes([
    { name: "sort", value: "-upvote" },
    { name: "limit", value: 10 },
  ]);

  const { data: allTag } = await getAllTag();

  return (
    <div>
      <AdminDashboardCard recipe={allRecipe} tags={allTag} />
    </div>
  );
};

export default AdminDashboard;
