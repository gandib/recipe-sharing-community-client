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
import { useUser } from "@/src/context/user.provider";
import {
  useDeleteRecipeComment,
  useUpdateRating,
  useUpdateRecipeComment,
} from "@/src/hooks/recipe.hook";
import { useState } from "react";
import { Cross, Delete, DeleteIcon, Minus, Plus, Star } from "lucide-react";
import { Button } from "@nextui-org/button";
import FXForm from "../form/FXForm";
import FXTextarea from "../form/FXTextarea";
import { FieldValues } from "react-hook-form";
const RecipeDetailCard = ({ recipe }: { recipe: IRecipe }) => {
  const { user, isLoading } = useUser();
  const { mutate: postRating } = useUpdateRating(user?.email!);
  const { mutate: updateComment } = useUpdateRecipeComment(user?.email!);
  const { mutate: deleteComment } = useDeleteRecipeComment(user?.email!);
  const [rate, setRate] = useState(5);
  const [commentError, setCommentError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRating = () => {
    const ratingData = {
      id: recipe?._id,
      data: {
        user: user?._id,
        rating: rate,
      },
    };
    postRating(ratingData);
  };

  const onSubmit = (data: FieldValues) => {
    if (!data.comment) {
      return setCommentError("Please provide a comment!");
    }
    const commentData = {
      id: recipe?._id,
      data: {
        user: user?._id,
        comment: data.comment,
      },
    };
    updateComment(commentData);
  };

  const handleDeleteComment = (id: string) => {
    const commentData = {
      id: recipe?._id,
      commentId: id,
    };
    deleteComment(commentData);
  };

  if (isLoading) {
    <p>Loading...</p>;
  }

  const rating = recipe?.rating || [];
  const averageRating =
    rating.length > 0
      ? (
          rating.reduce((pre, next) => pre + next.rating, 0) / rating.length
        ).toFixed(1)
      : "0";

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
              <h4 className="mt-2 rounded flex items-center p-1 text-base md:text-base font-medium text-green-500">
                Rating: {averageRating}
              </h4>
            </div>
            <div className="my-2 rounded  p-1 lg:text-lg font-medium flex justify-center ">
              <div
                className="instructions"
                dangerouslySetInnerHTML={{
                  __html: recipe.instructions,
                }}
              />
            </div>

            <div>
              <p className="text-green-500"> Comments:</p>
              {recipe?.comment &&
                recipe?.comment.length > 0 &&
                recipe?.comment?.map((comment) => (
                  <div className="my-2">
                    <p key={comment._id} className="flex gap-2">
                      User Name: {comment.user.name}{" "}
                      {user?._id === comment.user._id && (
                        <DeleteIcon
                          className="text-red-500"
                          onClick={() => handleDeleteComment(comment._id)}
                        />
                      )}
                    </p>
                    <p key={comment._id}>{comment.comment}</p>
                  </div>
                ))}
            </div>
          </CardHeader>
          <CardBody>
            <div className="my-6 flex items-center">
              <Minus
                onClick={() => {
                  if (rate !== 1) {
                    setRate(rate - 1);
                  }
                }}
                className="mr-2"
              />
              <p className="text-purple-500 font-bold flex justify-center items-center gap-1">
                {rate} <Star size={"18"} />
              </p>
              <Plus
                onClick={() => {
                  if (rate !== 5) {
                    setRate(rate + 1);
                  }
                }}
                className="mx-2"
              />
              <Button onClick={handleRating} size="sm" variant="flat">
                Rate Now
              </Button>
            </div>

            <div className="my-6 ">
              <h1>Leave a comment or update existing</h1>
              <div className="">
                <FXForm onSubmit={onSubmit}>
                  <FXTextarea label="Type a comment" name="comment" />
                  <p className="text-sm text-red-500">{commentError}</p>
                  <Button className="my-4" type="submit" variant="bordered">
                    Submit
                  </Button>
                </FXForm>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <UpvoteButton data={recipe} />
              <DownvoteButton data={recipe} />
            </div>
          </CardBody>

          <CardFooter className=" bottom-0 gap-2 justify-around border-t-1 border-zinc-100/50 bg-white/30">
            <RecipeUpdateButton id={recipe._id} />
            <RecipeDeleteButton id={recipe?._id} setLoading={setLoading} />
            <SeeDetailButton id={recipe?._id} />
          </CardFooter>
        </NextUiCard>
      )}
    </div>
  );
};

export default RecipeDetailCard;
