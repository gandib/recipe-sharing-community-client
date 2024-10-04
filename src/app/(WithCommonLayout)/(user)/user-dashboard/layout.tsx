import AdminSidebar from "@/src/components/UI/AdminSidebar";
import Container from "@/src/components/UI/Container";
import ProfileSidebar from "@/src/components/UI/ProfileSidebar";
import UserSidebar from "@/src/components/UI/UserSidebar";
import React from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <div className="my-3 flex w-full gap-6">
        <div className="w-2/5 min-h-full bg-default-100">
          <UserSidebar />
        </div>
        <div className="w-4/5">{children}</div>
      </div>
    </Container>
  );
};

export default UserLayout;
