import ProfilePageFeed from "@/src/components/UI/ProfilePageFeed";
import { getAllMyRecipes, getAllRecipes } from "@/src/services/Recipe";

export default async function ProfilePage() {
  const { data: recipes } = await getAllMyRecipes([
    { name: "sort", value: "-createdAt" },
    { name: "contentType", value: "free" },
  ]);

  const { data: allRecipe } = await getAllRecipes([
    { name: "sort", value: "-createdAt" },
  ]);

  return (
    <div>
      <ProfilePageFeed allRecipes={allRecipe} recipes={recipes} />
    </div>
  );
}
