import {
  Card as NextUiCard,
  CardHeader,
  CardFooter,
  CardBody,
} from "@nextui-org/react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import RecipeDeleteButton from "./RecipeDeleteButton";
import RecipeUpdateButton from "./RecipeUpdateButton";
import UpvoteButton from "./UpvoteButton";
import DownvoteButton from "./DownvoteButton";
import FollowUnFollowCard from "./FollowUnFollowCard";
import SeeDetailButton from "./SeeDetailButton";
import { IRecipe } from "@/src/types";

const RecipeDisplayCard = ({
  recipe,
  setLoading,
}: {
  recipe: IRecipe[];
  setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="grid lg:grid-cols-2 gap-2 grow">
      {recipe &&
        recipe.length > 0 &&
        recipe?.map((data: IRecipe) => (
          <NextUiCard
            key={data._id}
            isFooterBlurred
            className=" hover:shadow-2xl "
          >
            <CardHeader className=" h-[470px] sm:h-[500px] md:h-[600px] lg:h-[550px] flex-col items-start">
              {data?.image && data?.image?.length > 0 && (
                <Image
                  alt="Recipe image"
                  height={200}
                  src={data?.image[0]}
                  width={500}
                />
              )}
              <div className=" w-full">
                <h4 className="mt-2 rounded  p-1 text-lg sm:text-xl md:text-xl font-medium text-purple-500">
                  {data.title}
                </h4>
                <div className="mt-2 ">
                  <FollowUnFollowCard userId={data?.user?._id} />
                </div>
                {data.rating && data.rating.length > 0 ? (
                  <h4 className="mt-2 rounded flex items-center  p-1 text-base md:text-base font-medium text-green-500">
                    Rating:{" "}
                    {data?.rating?.length &&
                      (
                        data.rating.reduce(
                          (pre, next) => pre + next.rating,
                          0,
                        ) / data.rating.length
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
                  dangerouslySetInnerHTML={{
                    __html:
                      data.instructions.slice(0, 200) +
                      `${data.instructions.length > 200 ? "..." : ""}`,
                  }}
                  className="instructions"
                />
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex items-center gap-4 mt-4">
                <UpvoteButton data={data} />
                <DownvoteButton data={data} />
              </div>
            </CardBody>

            <CardFooter className=" bottom-0 gap-2 justify-around border-t-1 border-zinc-100/50 bg-white/30">
              <RecipeUpdateButton id={data._id} />
              <RecipeDeleteButton id={data?._id} setLoading={setLoading} />
              <SeeDetailButton id={data?._id} />
            </CardFooter>
          </NextUiCard>
        ))}
    </div>
  );
};

export default RecipeDisplayCard;
