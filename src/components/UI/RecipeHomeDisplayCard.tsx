import {
  Card as NextUiCard,
  CardHeader,
  CardFooter,
  CardBody,
} from "@nextui-org/react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";
import { TwitterIcon } from "../icons";
import RecipeDeleteButton from "./RecipeDeleteButton";
import RecipeUpdateButton from "./RecipeUpdateButton";
import UpvoteButton from "./UpvoteButton";
import DownvoteButton from "./DownvoteButton";
import FollowUnFollowCard from "./FollowUnFollowCard";
import SeeDetailButton from "./SeeDetailButton";
import { FacebookIcon } from "@/src/assets/icons";
import { IRecipe } from "@/src/types";
const RecipeHomeDisplayCard = ({
  recipe,
  user,
  shareUrl,
  role,
  setLoading,
}: {
  recipe: IRecipe[];
  user?: string;
  shareUrl?: string;
  role: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 grow ">
      {recipe &&
        recipe.length > 0 &&
        recipe?.map((data: IRecipe, index) => (
          <NextUiCard
            key={index}
            isFooterBlurred
            className="  hover:shadow-2xl"
          >
            <CardHeader className="h-[550px] sm:h-[600px] md:h-[550px] lg:h-[550px] flex-col items-start">
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
              <div className="flex items-center">
                <div>
                  {user && (
                    <div className="flex items-center gap-4 mt-4">
                      <UpvoteButton data={data} />
                      <DownvoteButton data={data} />
                    </div>
                  )}
                </div>

                {
                  <div className="flex items-center justify-end mx-2">
                    <Button
                      as="a"
                      className="text-blue-600  flex
                 items-center w-6"
                      href={`https://www.x.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location}/profile/${data?._id}`)}`}
                      rel="noopener noreferrer"
                      size="sm"
                      target="_blank"
                      variant="light"
                    >
                      <TwitterIcon />
                    </Button>
                    <Button
                      as="a"
                      className="  flex
                 items-center w-6"
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location}/profile/${data?._id}`)}`}
                      rel="noopener noreferrer"
                      size="sm"
                      target="_blank"
                      variant="light"
                    >
                      <FacebookIcon />
                    </Button>
                  </div>
                }
              </div>
            </CardBody>

            <CardFooter className=" bottom-0 gap-2 justify-around border-t-1 border-zinc-100/50 bg-white/30">
              {user && (user === data?.user?._id || role === "admin") && (
                <RecipeUpdateButton id={data._id} />
              )}
              {user && (user === data?.user?._id || role === "admin") && (
                <RecipeDeleteButton id={data?._id} setLoading={setLoading} />
              )}
              {user && <SeeDetailButton id={data?._id} />}
            </CardFooter>
          </NextUiCard>
        ))}
    </div>
  );
};

export default RecipeHomeDisplayCard;
