"use client";

import { useUser } from "@/src/context/user.provider";
import { Spinner } from "@nextui-org/react";
import { useGetUser } from "@/src/hooks/user.hook";
import AdminSidebarOptions from "./AdminSidebarOptions";
import { adminLinks } from "./constant";

const AdminSidebar = () => {
  const { user: userData, isLoading } = useUser();
  const { data: user } = useGetUser(userData?.email!);

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <div className="">
      <div className="mt-3 space-y-2 min-h-screen rounded-xl  p-2 sticky top-20">
        {isLoading && (
          <div className=" fixed w-1/4 h-14 rounded-md  flex justify-center items-center">
            <Spinner />
          </div>
        )}

        <AdminSidebarOptions links={adminLinks} />
      </div>
    </div>
  );
};

export default AdminSidebar;
