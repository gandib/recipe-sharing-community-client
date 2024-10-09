"use client";
import { IRecipe } from "@/src/types";
import {
  Card as NextUiCard,
  CardHeader,
  CardFooter,
  CardBody,
} from "@nextui-org/card";
import Image from "next/image";
import RecipeDeleteButton from "./RecipeDeleteButton";
import RecipeUpdateButton from "./RecipeUpdateButton";
import UpvoteButton from "./UpvoteButton";
import DownvoteButton from "./DownvoteButton";
import FollowUnFollowCard from "./FollowUnFollowCard";
import SeeDetailButton from "./SeeDetailButton";
const RecipeDetailCard = ({ recipe }: { recipe: IRecipe }) => {
  console.log(recipe);

  return (
    <div className="">
      {recipe && (
        <NextUiCard isFooterBlurred className="  ">
          <CardHeader className="w-full flex-col items-start">
            {recipe && (
              <Image
                width={1000}
                height={300}
                src={recipe?.image[0]}
                alt="Recipe image"
              />
            )}
            <div className=" w-full">
              <h4 className="mt-2 rounded  p-1 text-lg sm:text-xl md:text-xl font-medium text-purple-500">
                {recipe.title}
              </h4>
              <div className="mt-2 ">
                <FollowUnFollowCard userId={recipe?.user?._id} />
              </div>
              {recipe.rating && recipe.rating.length > 0 ? (
                <h4 className="mt-2 rounded flex items-center  p-1 text-base md:text-base font-medium text-green-500">
                  Rating:{" "}
                  {(
                    recipe.rating.reduce(
                      (pre, next) => pre.rating + next.rating
                    ) / recipe.rating.length
                  ).toFixed(1)}
                </h4>
              ) : (
                <h4 className="mt-2 rounded  p-1 text-base md:text-base font-medium text-green-500">
                  Rating: 0
                </h4>
              )}
            </div>
            <div className="my-2 rounded  p-1 lg:text-lg font-medium flex justify-center ">
              <div
                className="instructions"
                dangerouslySetInnerHTML={{
                  __html: recipe.instructions,
                }}
              />
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex items-center gap-4 mt-4">
              <UpvoteButton data={recipe} />
              <DownvoteButton data={recipe} />
            </div>
          </CardBody>

          <CardFooter className=" bottom-0 gap-2 justify-around border-t-1 border-zinc-100/50 bg-white/30">
            <RecipeUpdateButton id={recipe._id} />
            <RecipeDeleteButton id={recipe?._id} />
            <SeeDetailButton id={recipe?._id} />
          </CardFooter>
        </NextUiCard>
      )}
    </div>
  );
};

export default RecipeDetailCard;
