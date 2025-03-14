"use client";

import { IRecipe } from "@/src/types";
import HomePageDisplayCard from "./HomePageDisplayCard";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const HomePageFeedCard = ({
  recipe,
  setRevalidateProfile,
  revalidateProfile,
}: {
  recipe: { result: IRecipe[]; meta: any };
  setRevalidateProfile?: Dispatch<SetStateAction<boolean>>;
  revalidateProfile?: boolean;
}) => {
  const [revalidate, setRevalidate] = useState(false);
  console.log("page card", revalidateProfile);

  useEffect(() => {
    console.log("object pagecard");
  }, [revalidate, revalidateProfile]);
  return (
    <div className="grid gap-4">
      {recipe &&
        recipe?.result?.length > 0 &&
        recipe?.result?.map((data: IRecipe) => (
          <HomePageDisplayCard
            key={data?._id}
            data={data}
            setRevalidate={setRevalidate}
            setRevalidateProfile={setRevalidateProfile}
          />
        ))}
    </div>
  );
};

export default HomePageFeedCard;
