import Container from "@/src/components/UI/Container";
import HomePageCard from "@/src/components/UI/HomePageCard";
import RecipeFeedCard from "@/src/components/UI/RecipeFeedCard";
import { getAllRecipes, getAllTag } from "@/src/services/Recipe";

const Home = async () => {
  const { data: allRecipe } = await getAllRecipes([
    { name: "sort", value: "-createdAt" },
    { name: "contentType", value: "free" },
  ]);

  const { data: allTag } = await getAllTag();

  return (
    <div className="container mx-auto max-w-screen-2xl pt-4 px-6 flex-grow min-h-screen mt-12 lg:mt-16">
      <HomePageCard recipe={allRecipe} />
      {/* <RecipeFeedCard recipe={allRecipe} tags={allTag} /> */}
    </div>
  );
};

export default Home;
