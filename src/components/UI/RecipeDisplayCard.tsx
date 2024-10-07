import { IRecipe } from "@/src/types";
import { Button } from "@nextui-org/button";
import {
  Card as NextUiCard,
  CardHeader,
  CardFooter,
  CardBody,
} from "@nextui-org/card";
import Image from "next/image";
import RecipeDeleteButton from "./RecipeDeleteButton";
import RecipeUpdateButton from "./RecipeUpdateButton";
const RecipeDisplayCard = ({ recipe }: { recipe: IRecipe[] }) => {
  console.log(recipe);

  return (
    <div className="grid lg:grid-cols-2 gap-2 grow">
      {recipe &&
        recipe.length > 0 &&
        recipe?.map((data: IRecipe) => (
          <NextUiCard key={data._id} isFooterBlurred className="  w-full">
            <CardHeader className="h-[400px] sm:h-[450px] md:h-[500px] flex-col items-start">
              {data?.image && data?.image?.length > 0 && (
                <Image
                  width={300}
                  height={200}
                  src={data?.image[0]}
                  alt="Recipe image"
                  className="w-full"
                />
              )}
              <div className="flex justify-between w-full">
                <h4 className="mt-2 rounded  p-1 text-lg sm:text-xl md:text-xl font-medium text-purple-500">
                  {data.title}
                </h4>
              </div>
              <div className="my-2 rounded  p-1 lg:text-lg font-medium flex justify-center ">
                <div
                  className="instructions"
                  dangerouslySetInnerHTML={{
                    __html:
                      data.instructions.slice(0, 200) +
                      `${data.instructions.length > 200 ? "..." : ""}`,
                  }}
                />
              </div>
            </CardHeader>

            <CardFooter className=" bottom-0 gap-2 justify-around border-t-1 border-zinc-100/50 bg-white/30">
              <RecipeUpdateButton id={data._id} />
              <RecipeDeleteButton id={data?._id} />
              <Button>See Detail</Button>
            </CardFooter>
          </NextUiCard>
        ))}
    </div>
  );
};

export default RecipeDisplayCard;
