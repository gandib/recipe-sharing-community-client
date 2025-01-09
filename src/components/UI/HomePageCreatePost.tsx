"use client";

import { ImageIcon, Smile } from "lucide-react";
import HomePageCreatePostModal from "./HomePageCreatePostModal";
import { useState } from "react";

const HomePageCreatePost = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-100 rounded p-6 mb-6">
      <p className="text-base font-semibold text-gray-700">Create New Post</p>
      <input
        className="rounded-3xl py-3 pr-3 pl-8 w-full my-4 text-sm"
        placeholder="Create New Post"
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <HomePageCreatePostModal
          title="Create Recipe"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
      <div className="flex items-center gap-8">
        <div className="flex items-center">
          <ImageIcon className="text-green-500 " />
          <p className="text-tiny font-semibold pl-2 text-gray-700">
            Photo/Video
          </p>
        </div>
        <div className="flex items-center">
          <Smile className="text-yellow-500 " />
          <p className="text-tiny font-semibold pl-2 text-gray-700">
            Feeling/Activity
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePageCreatePost;
