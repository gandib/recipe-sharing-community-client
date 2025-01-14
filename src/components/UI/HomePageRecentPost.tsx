"use client";

import { IRecipe } from "@/src/types";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HomePageRecentPost = ({
  recipes,
}: {
  recipes: { result: IRecipe[]; meta: any };
}) => {
  const router = useRouter();
  return (
    <div className="w-full min-h-[180px] sticky top-5 bg-gray-100 rounded p-4">
      <h1 className="text-gray-600 font-bold">Recent Posts</h1>
      {recipes?.result?.length < 1 && (
        <p className="text-base w-full mt-6">No recent post found!</p>
      )}
      {recipes &&
        recipes.result.length > 0 &&
        recipes.result.slice(0, 5).map((recipe: IRecipe) => (
          <div
            key={recipe._id}
            className="flex mt-4 bg-white border-1 rounded h-[75px]"
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
                className="text-gray-600 text-sm font-semibold cursor-pointer hover:text-primary-500"
              >
                {recipe.title.slice(0, 25) + "..."}
              </h2>
              <p className="text-tiny py-2 text-gray-600">
                {moment(recipe.createdAt).format("MMM DD, YYYY")}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default HomePageRecentPost;
