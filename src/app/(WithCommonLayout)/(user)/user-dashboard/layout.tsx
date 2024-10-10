import AdminSidebar from "@/src/components/UI/AdminSidebar";
import Container from "@/src/components/UI/Container";
import ProfileSidebar from "@/src/components/UI/ProfileSidebar";
import SidebarMenu from "@/src/components/UI/SidebarMenu";
import UserSidebar from "@/src/components/UI/UserSidebar";
import { userLinks } from "@/src/components/UI/UserSidebar/constant";
import React from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <div className="md:hidden">
        <SidebarMenu links={userLinks} />
      </div>
      <div className="my-3 flex w-full gap-6 justify-center">
        <div className="md:w-1/5 hidden md:flex min-h-full bg-default-100">
          <UserSidebar />
        </div>
        <div className="w-5/5">{children}</div>
      </div>
    </Container>
  );
};

export default UserLayout;
