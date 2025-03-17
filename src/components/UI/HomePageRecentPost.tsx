"use client";

import { IRecipe } from "@/src/types";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HomePageRecentPost = ({
  recipes,
  title,
}: {
  recipes: IRecipe[];
  title: string;
}) => {
  const router = useRouter();
  return (
    <div className="w-full min-h-[180px] bg-default-100 rounded p-4">
      <h1 className=" font-bold">{title}</h1>
      {recipes?.length < 1 && (
        <p className="text-base w-full mt-6">No recent post found!</p>
      )}
      {recipes &&
        recipes.length > 0 &&
        recipes.slice(0, 5).map((recipe: IRecipe) => (
          <div
            key={recipe._id}
            className="flex mt-4 bg-default-150 border-1 rounded h-[75px]"
          >
            <Image
              src={recipe.image[0]}
              width={70}
              height={50}
              alt="Time with nature"
              className="h-full rounded"
            />
            <div className="px-2 w-full flex flex-col h-[50px] ">
              <h2
                onClick={() => router.push(`/profile/${recipe._id}`)}
                className=" text-sm font-semibold cursor-pointer hover:text-primary-500"
              >
                {recipe.title.slice(0, 25) +
                  `${recipe.title.length > 25 ? "..." : ""}`}
              </h2>
              <p className="text-tiny py-2 ">
                {moment(recipe.createdAt).format("MMM DD, YYYY")}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default HomePageRecentPost;
