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

  // const token = cookies().get("accessToken")?.value;
  // console.log(token);
  // const decoded = await jwtDecode(token as string);
  // console.log(decoded);

  return (
    <Container>
      <RecipeFeedCard recipe={allRecipe} tags={allTag} />
    </Container>
  );
};

export default Home;
