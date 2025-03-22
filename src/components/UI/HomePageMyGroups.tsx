"use client";

import { Avatar } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IGroup, TGroupMeta } from "@/src/types";

const HomePageMyGroups = ({ allGroups }: { allGroups: TGroupMeta }) => {
  const router = useRouter();
  const [allMyGroups, setAllMyGroups] = useState<TGroupMeta>(allGroups);

  return (
    <div className="bg-default-100 rounded p-6 ">
      <h1 className="text-base  font-bold mb-6">Your Groups</h1>
      {allMyGroups?.result?.map((group: IGroup) => (
        <div
          key={group._id}
          className="flex  justify-between pb-2 border-b my-4"
        >
          <div className="flex">
            <Avatar
              src={group.image[0]}
              // width={64}
              // height={64}
              alt="img"
              size="lg"
              // className="rounded-full bg-primary-500"
            />
            <div className="pl-2">
              <p className="text-sm font-bold">{group.name}</p>
              <p className="text-sm py-1">
                Members{" "}
                <span className="border-red-500 border-1 rounded px-1">
                  {group.members.length}
                </span>
              </p>
              <button
                className="text-primary-500 hover:text-primary-400 underline text-tiny cursor-pointer"
                onClick={() => router.push(`/groups?groupId=${group._id}`)}
              >
                view feed
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePageMyGroups;
