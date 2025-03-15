import AdminSidebar from "@/src/components/UI/AdminSidebar";
import { adminLinks } from "@/src/components/UI/AdminSidebar/constant";
import Container from "@/src/components/UI/Container";
import ProfileSidebar from "@/src/components/UI/ProfileSidebar";
import SidebarMenu from "@/src/components/UI/SidebarMenu";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto w-full flex-grow min-h-screen">
      <div className="md:hidden">
        <SidebarMenu links={adminLinks} />
      </div>
      <div className="flex w-full gap-3 justify-center">
        <div className="w-1/12 md:w-2/6 lg:w-1/6 hidden md:flex min-h-full bg-default-50 border">
          <div className="hidden md:flex">
            <AdminSidebar />
          </div>
        </div>
        <div className="w-11/12 md:w-4/6 lg:w-5/6 mt-20">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
