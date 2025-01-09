"use client";

import { IRecipe } from "@/src/types";
import HomePageDisplayCard from "./HomePageDisplayCard";

const HomePageFeedCard = ({
  recipe,
}: {
  recipe: { result: IRecipe[]; meta: any };
}) => {
  return (
    <div className="grid gap-8">
      {recipe &&
        recipe.result.length > 0 &&
        recipe?.result?.map((data: IRecipe) => (
          <HomePageDisplayCard key={data?._id} data={data} />
        ))}
    </div>
  );
};

export default HomePageFeedCard;
