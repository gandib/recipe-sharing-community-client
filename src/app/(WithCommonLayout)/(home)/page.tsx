import Container from "@/src/components/UI/Container";
import RecipeFeedCard from "@/src/components/UI/RecipeFeedCard";
import { getAllRecipes, getAllTag } from "@/src/services/Recipe";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const Home = async () => {
  const { data: allRecipe } = await getAllRecipes([
    { name: "sort", value: "-upvote" },
  ]);

  const { data: allTag } = await getAllTag();

  const ff = cookies().get("accessToken")?.value;
  console.log(ff);
  // const decoded = await jwtDecode(ff as string);
  // console.log(decoded);

  return (
    <Container>
      <RecipeFeedCard recipe={allRecipe} tags={allTag} />
    </Container>
  );
};

export default Home;
