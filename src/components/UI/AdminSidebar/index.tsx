"use client";

import { useUser } from "@/src/context/user.provider";
import { Spinner } from "@nextui-org/spinner";
import { useGetUser } from "@/src/hooks/user.hook";
import AdminSidebarOptions from "./AdminSidebarOptions";
import { adminLinks } from "./constant";

const AdminSidebar = () => {
  const { user: userData, isLoading } = useUser();
  const { data: user } = useGetUser(userData?.email!);

  return (
    <div className="">
      <div className="mt-3 space-y-2 min-h-screen rounded-xl bg-default-100 p-2">
        {isLoading && (
          <div className=" bg-black/10 fixed w-1/4 h-14 rounded-md backdrop-blur-md flex justify-center items-center">
            <Spinner />
          </div>
        )}

        <AdminSidebarOptions links={adminLinks} />
      </div>
    </div>
  );
};

export default AdminSidebar;
