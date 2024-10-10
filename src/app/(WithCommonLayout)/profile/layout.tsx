import Container from "@/src/components/UI/Container";
import ProfileSidebar from "@/src/components/UI/ProfileSidebar";
import { profileLinks } from "@/src/components/UI/ProfileSidebar/constant";
import SidebarMenu from "@/src/components/UI/SidebarMenu";
import React from "react";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <div className="md:hidden">
        <SidebarMenu links={profileLinks} />
      </div>
      <div className="my-3 flex w-full gap-6 ">
        <div className="md:w-1/5 hidden md:flex min-h-full bg-default-100">
          <ProfileSidebar />
        </div>
        <div className="w-5/5">{children}</div>
      </div>
    </Container>
  );
};

export default ProfileLayout;
