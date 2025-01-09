"use client";

import { User } from "@nextui-org/react";

const HomePageFollowing = () => {
  return (
    <div className="bg-gray-100 rounded p-6 sticky top-20">
      <h1 className="text-base text-gray-700 font-semibold mb-6">
        Who's following
      </h1>
      <div className="flex text-gray-700 justify-between pb-2">
        <div className="flex">
          {/* <Image
          src={"https://tt.com"}
          width={40}
          height={40}
          alt="img"
          className="rounded-full bg-primary-500"
        /> */}
          {/* <div className="pl-2">
          <p className="text-sm font-bold">Gandib Roy</p>
          <p className="text-tiny">Premium</p>
        </div> */}
          <User
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            }}
            description="Premium"
            name="Jane Doe"
          />
        </div>
        <p className="text-xs text-primary-500 cursor-pointer">Follow</p>
      </div>
      <div className="flex text-gray-700 justify-between">
        <div className="flex">
          {/* <Image
          src={"https://tt.com"}
          width={40}
          height={40}
          alt="img"
          className="rounded-full bg-primary-500"
        />
        <div className="pl-2">
          <p className="text-sm font-bold">Gandib Roy</p>
          <p className="text-tiny">Premium</p>
        </div> */}
          <User
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            }}
            description="Premium"
            name="Jane Doe"
          />
        </div>
        <p className="text-xs text-primary-500 cursor-pointer">Follow</p>
      </div>
    </div>
  );
};

export default HomePageFollowing;
