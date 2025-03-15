"use client";

import { useUser } from "@/src/context/user.provider";
import { IRecipe } from "@/src/types";
import { Avatar, Button } from "@nextui-org/react";
import {
  DeleteIcon,
  Ellipsis,
  Flag,
  Globe,
  MessageSquare,
  Pen,
  Share2Icon,
  ThumbsDown,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import DeletePostModal from "./DeletePostModal";
import {
  useDeleteRecipeComment,
  useUpdateDownvote,
  useUpdateRecipeComment,
  useUpdateUpvote,
} from "@/src/hooks/recipe.hook";
import ShareModal from "./ShareModal";
import FXForm from "../form/FXForm";
import FXTextarea from "../form/FXTextarea";
import { FieldValues } from "react-hook-form";
import FollowUnFollowCard from "./FollowUnFollowCard";
import HomePageFollowUnFollowCard from "./HomePageFollowUnfollowCard";
import HomePageCreatePostModal from "./HomePageCreatePostModal";

const HomePageDisplayCard = ({
  data,
  setRevalidate,
  setRevalidateProfile,
}: {
  data: IRecipe;
  setRevalidate: Dispatch<SetStateAction<boolean>>;
  setRevalidateProfile?: Dispatch<SetStateAction<boolean>>;
}) => {
  const [seeMore, setSeeMore] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: upvote } = useUpdateUpvote(user?.email!);
  const { mutate: downvote } = useUpdateDownvote(user?.email!);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [commentShow, setCommentShow] = useState(false);
  const [commentError, setCommentError] = useState("");
  const { mutate: updateComment } = useUpdateRecipeComment(user?.email!);
  const { mutate: deleteComment } = useDeleteRecipeComment(user?.email!);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleDelete = () => {
    setIsOpen(true);
    setShowOptions(false);
  };

  const handleUpvote = () => {
    const upvoteData = {
      id: data._id,
      data: {
        upvote: user?._id,
      },
    };
    upvote(upvoteData);
  };

  const handleDownvote = () => {
    const downvoteData = {
      id: data?._id,
      data: {
        downvote: user?._id,
      },
    };
    downvote(downvoteData);
  };

  const onSubmit = (formData: FieldValues) => {
    if (!formData.comment) {
      return setCommentError("Please provide a comment!");
    }
    const commentData = {
      id: data?._id,
      data: {
        user: user?._id,
        comment: formData.comment,
      },
    };
    updateComment(commentData);
  };

  const handleDeleteComment = (id: string) => {
    const commentData = {
      id: data?._id,
      commentId: id,
    };
    deleteComment(commentData);
  };

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <div className="bg-default-100 rounded p-4">
      <div className="flex justify-between items-start relative">
        {/* Avatar and User Info */}
        <div className="flex">
          <Avatar
            src={data?.user?.image}
            alt="img"
            className="rounded-full bg-primary-500"
          />
          <div className="pl-2">
            <div className="text-sm flex items-center font-bold text-primary-500">
              <p> {data?.user?.name}</p>
              <div className="">
                <HomePageFollowUnFollowCard userId={data?.user?._id} />
              </div>
            </div>
            <p className="text-tiny flex">
              <Globe size={"14px"} />
              <span className="pl-1">
                Published: {moment(data?.createdAt).format("MMM DD, YYYY")}
              </span>
            </p>
          </div>
        </div>

        {/* Ellipsis Icon with Dropdown */}
        <div className="text-xs text-primary-500 relative">
          <Ellipsis
            onClick={() => setShowOptions(!showOptions)}
            className="cursor-pointer"
          />
          {showOptions && (
            <div className="absolute right-0 top-full mt-2 w-[150px] shadow-lg rounded-md p-4 bg-default-200 z-50 text-default-900">
              <div className="grid gap-4">
                {user?._id === data?.user?._id && (
                  <div
                    onClick={() => {
                      // router.push(
                      //   `${user?.role === "user" ? `/user-dashboard/update-recipe/${data._id}` : `/admin-dashboard/update-recipe/${data._id}`}`
                      // );
                      setShowOptions(false);
                      setIsUpdateModalOpen(true);
                    }}
                    className=" cursor-pointer flex items-center hover:text-primary-500"
                  >
                    <Pen size={20} /> <span className="pl-2">Edit Post</span>
                  </div>
                )}

                {user?._id === data?.user?._id && (
                  <div
                    onClick={handleDelete}
                    className=" cursor-pointer flex items-center hover:text-primary-500"
                  >
                    <Trash2 size={20} />{" "}
                    <span className="pl-2">Delete Post</span>
                  </div>
                )}

                <div
                  onClick={() => {
                    setShowOptions(false);
                  }}
                  className=" cursor-pointer flex items-center hover:text-primary-500"
                >
                  <Flag size={20} /> <span className="pl-2">Report Post</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {isUpdateModalOpen && (
        <HomePageCreatePostModal
          title="Update Recipe"
          isOpen={isUpdateModalOpen}
          setIsOpen={setIsUpdateModalOpen}
          singleRecipeData={data}
          id={data._id}
          setRevalidate={setRevalidate}
          setRevalidateProfile={setRevalidateProfile}
        />
      )}

      {isOpen && (
        <DeletePostModal
          id={data?._id}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setRevalidateProfile={setRevalidateProfile}
        />
      )}

      {/* Content */}
      <div>
        <h1 className="mb-4 mt-4 italic text-base font-semibold text-secondary-500">
          {data?.tags}
        </h1>
        <h1 className=" my-2 text-xl font-semibold ">{data?.title}</h1>

        <div className="recipe-instructions ">
          {!seeMore ? (
            <>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    data?.instructions.slice(0, 200) +
                    `${data.instructions.length > 200 ? "..." : ""}`,
                }}
              ></div>
              {data?.instructions.length > 200 && (
                <button
                  onClick={() => setSeeMore(true)}
                  className="text-primary-500"
                >
                  See more
                </button>
              )}
            </>
          ) : (
            <>
              <div
                dangerouslySetInnerHTML={{ __html: data?.instructions }}
              ></div>
              <button
                onClick={() => setSeeMore(false)}
                className="text-primary-500"
              >
                See less
              </button>
            </>
          )}
        </div>

        <div className="h-[300px] w-full py-4">
          <Image
            src={data?.image[0]}
            width={500}
            height={500}
            alt="recipe-image"
            className="h-full w-full"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex  mt-1">
        <div
          onClick={handleUpvote}
          className={`flex items-center  text-sm px-2 py-1 rounded cursor-pointer ${data?.upvote.includes(user?._id) ? "text-green-500 hover:text-blue-500" : "hover:text-blue-500"}`}
        >
          <ThumbsUp size={20} />
        </div>
        <div
          onClick={handleDownvote}
          className={`flex items-center text-sm  p-2 mx-4 rounded cursor-pointer ${data?.downvote.includes(user?._id) ? "text-green-500 hover:text-blue-500 cursor-pointer" : "hover:text-blue-500"}`}
        >
          <ThumbsDown size={20} />
        </div>
        <div
          onClick={() => setCommentShow(!commentShow)}
          className="flex items-center text-sm p-2 rounded cursor-pointer hover:text-primary-500"
        >
          <MessageSquare size={20} />
        </div>
        <div
          onClick={() => setIsShareOpen(true)}
          className="flex items-center text-sm  p-2 mx-4 rounded cursor-pointer hover:text-primary-500"
        >
          <Share2Icon size={20} />
        </div>
      </div>
      {isShareOpen && (
        <ShareModal
          id={data._id}
          isOpen={isShareOpen}
          setIsOpen={setIsShareOpen}
        />
      )}

      {commentShow && (
        <div className="pt-2">
          <div>
            <div className="">
              <FXForm onSubmit={onSubmit}>
                <FXTextarea label="Type a comment" name="comment" />
                <p className="text-sm text-red-500">{commentError}</p>
                <Button className="my-4 " type="submit" variant="bordered">
                  Submit
                </Button>
              </FXForm>
            </div>
          </div>

          {data.comment.length > 0 && (
            <div>
              <p className="text-green-500"> Comments:</p>
              {data?.comment &&
                data?.comment.length > 0 &&
                data?.comment?.map((comment) => (
                  <div key={comment.user._id} className="my-2  flex">
                    <Avatar src={comment.user.image} />
                    <div className="bg-default-200 w-full rounded p-2 ml-2">
                      <p
                        key={comment._id}
                        className="flex gap-2 text-sm font-semibold"
                      >
                        {comment.user.name}{" "}
                        {user?._id === comment.user._id && (
                          <DeleteIcon
                            className="text-red-500 cursor-pointer hover:text-red-800"
                            onClick={() => handleDeleteComment(comment._id)}
                          />
                        )}
                      </p>
                      <p className="text-sm" key={comment._id}>
                        {comment.comment}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePageDisplayCard;
