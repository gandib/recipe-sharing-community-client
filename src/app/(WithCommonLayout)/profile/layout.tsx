import Container from "@/src/components/UI/Container";
import ProfileSidebar from "@/src/components/UI/ProfileSidebar";
import { profileLinks } from "@/src/components/UI/ProfileSidebar/constant";
import SidebarMenu from "@/src/components/UI/SidebarMenu";
import React from "react";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto w-full flex-grow min-h-screen">
      {/* <div className="md:hidden">
        <SidebarMenu links={profileLinks} />
      </div> */}
      <div className="flex w-full gap-6 justify-center">
        {/* <div className="w-1/12 md:w-2/6 lg:w-1/6 hidden md:flex min-h-full bg-gray-600">
          <ProfileSidebar />
        </div> */}
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default ProfileLayout;
