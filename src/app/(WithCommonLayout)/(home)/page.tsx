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
    <Container>
      <HomePageCard recipe={allRecipe} />
      {/* <RecipeFeedCard recipe={allRecipe} tags={allTag} /> */}
    </Container>
  );
};

export default Home;
