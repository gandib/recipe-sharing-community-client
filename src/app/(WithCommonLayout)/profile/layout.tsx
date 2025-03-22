import React from "react";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto w-full flex-grow min-h-screen mt-20">
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
