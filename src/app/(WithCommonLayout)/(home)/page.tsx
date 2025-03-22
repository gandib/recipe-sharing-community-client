export const dynamic = "force-dynamic";
import HomePageCard from "@/src/components/UI/HomePageCard";
import { getAllMyGroups } from "@/src/services/GroupService";
import { getAllRecipes } from "@/src/services/Recipe";

const Home = async () => {
  try {
    const [recipesResponse, groupsResponse] = await Promise.all([
      getAllRecipes([
        { name: "sort", value: "-createdAt" },
        { name: "contentType", value: "free" },
      ]),
      getAllMyGroups([{ name: "sort", value: "-createdAt" }]),
    ]);

    const allRecipe = recipesResponse?.data?.result || [];
    const allGroups = groupsResponse?.data || [];

    return (
      <div className="container mx-auto max-w-screen-2xl pt-4 px-6 flex-grow min-h-screen mt-12 lg:mt-16">
        <HomePageCard allGroups={allGroups} recipe={allRecipe} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);

    return (
      <div className="container mx-auto max-w-screen-2xl pt-4 px-6 flex-grow min-h-screen mt-12 lg:mt-16">
        <HomePageCard />
      </div>
    );
  }
};

export default Home;
