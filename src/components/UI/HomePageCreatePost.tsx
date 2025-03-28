"use client";

import { ImageIcon, Smile } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import HomePageCreatePostModal from "./HomePageCreatePostModal";

const HomePageCreatePost = ({
  setRevalidateProfile,
  revalidateProfile,
  groupId,
}: {
  setRevalidateProfile?: Dispatch<SetStateAction<boolean>>;
  revalidateProfile?: boolean;
  groupId?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [revalidate, setRevalidate] = useState(false);

  useEffect(() => {}, [revalidate, revalidateProfile]);

  return (
    <div className="bg-default-100 rounded p-6 mb-6">
      <p className="text-base font-semibold ">Create New Post</p>
      <input
        className="rounded-3xl py-3 pr-3 pl-8 w-full my-4 text-sm"
        placeholder="Create New Post"
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <HomePageCreatePostModal
          groupId={groupId}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setRevalidate={setRevalidate}
          setRevalidateProfile={setRevalidateProfile}
          title="Create Recipe"
        />
      )}
      <div className="flex items-center gap-8">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <ImageIcon className="text-green-500 " />
          <p className="text-tiny font-semibold pl-2 ">Photo/Video</p>
        </div>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <Smile className="text-yellow-500 " />
          <p className="text-tiny font-semibold pl-2 ">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
};

export default HomePageCreatePost;
