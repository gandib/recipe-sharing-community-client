import Container from "@/src/components/UI/Container";
import RecipeFeedCard from "@/src/components/UI/RecipeFeedCard";
import { getAllRecipes, getAllTag } from "@/src/services/Recipe";

const Home = async () => {
  const { data: allRecipe } = await getAllRecipes([
    { name: "sort", value: "-upvote" },
  ]);
  console.log({ allRecipe });

  const { data: allTag } = await getAllTag();
  console.log({ allTag });
  return (
    <Container>
      <RecipeFeedCard recipe={allRecipe} tags={allTag} />
    </Container>
  );
};

export default Home;
