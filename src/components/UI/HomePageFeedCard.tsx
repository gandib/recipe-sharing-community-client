"use client";

import { IRecipe } from "@/src/types";
import HomePageDisplayCard from "./HomePageDisplayCard";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

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
