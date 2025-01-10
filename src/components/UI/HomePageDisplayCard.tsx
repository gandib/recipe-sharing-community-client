"use client";

import { useUser } from "@/src/context/user.provider";
import { IRecipe } from "@/src/types";
import { Avatar } from "@nextui-org/react";
import {
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
import { useState } from "react";
import DeletePostModal from "./DeletePostModal";

const HomePageDisplayCard = ({ data }: { data: IRecipe }) => {
  const [seeMore, setSeeMore] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    setShowOptions(false);
    setIsOpen(true);
  };

  if (isLoading) {
    <p>Loading...</p>;
  }
  return (
    <div className="bg-gray-100 rounded p-4">
      <div className="flex justify-between items-start relative">
        {/* Avatar and User Info */}
        <div className="flex">
          <Avatar
            src={data?.user?.image}
            alt="img"
            className="rounded-full bg-primary-500"
          />
          <div className="pl-2">
            <p className="text-sm font-bold text-primary-500">
              {data?.user?.name}
            </p>
            <p className="text-tiny flex text-gray-600">
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
            <div className="absolute right-0 top-full mt-2 w-[150px] shadow-lg rounded-md p-4 bg-gray-100 z-50 ">
              <div className="grid gap-4">
                {user?._id === data?.user?._id && (
                  <div
                    onClick={() => {
                      router.push(
                        `${user?.role === "user" ? `/user-dashboard/update-recipe/${data._id}` : `/admin-dashboard/update-recipe/${data._id}`}`
                      );
                      setShowOptions(false);
                    }}
                    className="text-gray-700 cursor-pointer flex items-center hover:text-primary-500"
                  >
                    <Pen size={20} /> <span className="pl-2">Edit Post</span>
                  </div>
                )}
                {user?._id === data?.user?._id && (
                  <div
                    onClick={handleDelete}
                    className="text-gray-700 cursor-pointer flex items-center hover:text-primary-500"
                  >
                    <Trash2 size={20} />{" "}
                    <span className="pl-2">Delete Post</span>
                  </div>
                )}

                <div
                  onClick={() => {
                    setShowOptions(false);
                  }}
                  className="text-gray-700 cursor-pointer flex items-center hover:text-primary-500"
                >
                  <Flag size={20} /> <span className="pl-2">Report Post</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <DeletePostModal id={data?._id} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}

      {/* Content */}
      <div>
        <h1 className="mb-4 mt-4 italic text-base font-semibold text-secondary-500">
          {data?.tags}
        </h1>
        <h1 className=" my-2 text-xl font-semibold text-gray-600">
          {data?.title}
        </h1>

        <div className="recipe-instructions text-gray-700">
          {!seeMore ? (
            <>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    data?.instructions.slice(0, 200) +
                    `${data.instructions.length > 200 ? "..." : ""}`, // Adjust slicing logic based on HTML content
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
      <div className="flex text-gray-700 mt-4">
        <div className="flex items-center border text-sm px-2 py-1 rounded cursor-pointer hover:bg-primary-500 hover:text-white">
          <ThumbsUp size={20} /> <span className="pl-2">Like</span>
        </div>
        <div className="flex items-center text-sm border p-2 mx-4 rounded cursor-pointer hover:bg-primary-500 hover:text-white">
          <ThumbsDown size={20} /> <span className="pl-2">Unlike</span>
        </div>
        <div className="flex items-center text-sm border p-2 rounded cursor-pointer hover:bg-primary-500 hover:text-white">
          <MessageSquare size={20} /> <span className="pl-2">Comment</span>
        </div>
        <div className="flex items-center text-sm border p-2 mx-4 rounded cursor-pointer hover:bg-primary-500 hover:text-white">
          <Share2Icon size={20} /> <span className="pl-2">Share</span>
        </div>
      </div>
    </div>
  );
};

export default HomePageDisplayCard;
