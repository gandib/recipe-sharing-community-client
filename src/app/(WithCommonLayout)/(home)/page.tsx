import HomePageCard from "@/src/components/UI/HomePageCard";
import { getAllMyGroups } from "@/src/services/GroupService";
import { getAllRecipes } from "@/src/services/Recipe";

const Home = async () => {
  const { data: allRecipe } = await getAllRecipes([
    { name: "sort", value: "-createdAt" },
    { name: "contentType", value: "free" },
  ]);

  const { data: allGroups } = await getAllMyGroups([
    { name: "sort", value: "-createdAt" },
  ]);

  return (
    <div className="container mx-auto max-w-screen-2xl pt-4 px-6 flex-grow min-h-screen mt-12 lg:mt-16">
      <HomePageCard recipe={allRecipe?.result} allGroups={allGroups} />
      {/* <RecipeFeedCard recipe={allRecipe} tags={allTag} /> */}
    </div>
  );
};

export default Home;
