import Container from "@/src/components/UI/Container";
import ProfileSidebar from "@/src/components/UI/ProfileSidebar";
import React from "react";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <div className="my-3 flex w-full gap-6">
        <div className="w-2/5 min-h-full bg-default-100">
          <ProfileSidebar />
        </div>
        <div className="w-4/4">{children}</div>
      </div>
    </Container>
  );
};

export default ProfileLayout;
