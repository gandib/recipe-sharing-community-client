"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import HomePageDisplayCard from "./HomePageDisplayCard";
import { IRecipe } from "@/src/types";

const HomePageFeedCard = ({
  recipe,
  setRevalidateProfile,
  revalidateProfile,
  groupId,
}: {
  recipe: IRecipe[];
  setRevalidateProfile?: Dispatch<SetStateAction<boolean>>;
  revalidateProfile?: boolean;
  groupId?: string;
}) => {
  const [revalidate, setRevalidate] = useState(false);

  useEffect(() => {}, [revalidate, revalidateProfile]);

  return (
    <div className="grid gap-4">
      {recipe &&
        recipe?.length > 0 &&
        recipe?.map((data: IRecipe) => (
          <HomePageDisplayCard
            key={data?._id}
            data={data}
            groupId={groupId}
            setRevalidate={setRevalidate}
            setRevalidateProfile={setRevalidateProfile}
          />
        ))}
    </div>
  );
};

export default HomePageFeedCard;
