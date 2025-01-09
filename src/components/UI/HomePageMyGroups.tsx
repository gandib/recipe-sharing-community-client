"use client";

import { Avatar } from "@nextui-org/react";

const HomePageMyGroups = () => {
  return (
    <div className="bg-gray-100 rounded p-6 mb-6">
      <h1 className="text-base text-gray-700 font-semibold mb-6">
        Your Groups
      </h1>
      <div className="flex text-gray-700 justify-between pb-2">
        <div className="flex">
          <Avatar
            src={"https://i.pravatar.cc/150?u=a04258114e29026702d"}
            // width={64}
            // height={64}
            alt="img"
            size="lg"
            // className="rounded-full bg-primary-500"
          />
          <div className="pl-2">
            <p className="text-sm font-bold">Good Group</p>
            <p className="text-sm py-1">
              Notification{" "}
              <span className="border-red-500 border-1 rounded px-1">12</span>
            </p>
            <p className="text-primary-500 underline text-tiny cursor-pointer">
              view feed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageMyGroups;
