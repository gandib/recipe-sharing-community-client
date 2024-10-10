"use clinet";

import { useUser } from "@/src/context/user.provider";
import { useUpdateDownvote } from "@/src/hooks/recipe.hook";
import { IRecipe } from "@/src/types";
import { ThumbsDown } from "lucide-react";

const DownvoteButton = ({ data }: { data: IRecipe }) => {
  const { user, isLoading } = useUser();
  const { mutate: downvote } = useUpdateDownvote(user?.email!);
  const handleDownvote = () => {
    const downvoteData = {
      id: data?._id,
      data: {
        downvote: user?._id,
      },
    };
    downvote(downvoteData);
  };

  if (isLoading) {
    <p>Loading...</p>;
  }
  return (
    <div>
      <ThumbsDown
        className={`${data?.downvote.includes(user?._id) ? "text-green-500 hover:text-blue-500 cursor-pointer" : "hover:text-blue-500 cursor-pointer"}`}
        onClick={handleDownvote}
      />
    </div>
  );
};

export default DownvoteButton;
