"use clinet";

import { useUser } from "@/src/context/user.provider";
import { useUpdateUpvote } from "@/src/hooks/recipe.hook";
import { IRecipe } from "@/src/types";
import { ThumbsUp } from "lucide-react";

const UpvoteButton = ({ data }: { data: IRecipe }) => {
  const { user, isLoading } = useUser();
  const { mutate: upvote } = useUpdateUpvote(user?.email!);
  const handleUpvote = () => {
    console.log(data._id);
    const upvoteData = {
      id: data._id,
      data: {
        upvote: user?._id,
      },
    };
    upvote(upvoteData);
  };

  if (isLoading) {
    <p>Loading...</p>;
  }
  return (
    <div>
      <ThumbsUp
        className={`${data?.upvote.includes(user?._id) ? "text-green-500" : ""}`}
        onClick={handleUpvote}
      />
    </div>
  );
};

export default UpvoteButton;
