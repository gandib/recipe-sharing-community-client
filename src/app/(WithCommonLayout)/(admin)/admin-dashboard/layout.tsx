import AdminSidebar from "@/src/components/UI/AdminSidebar";
import Container from "@/src/components/UI/Container";
import ProfileSidebar from "@/src/components/UI/ProfileSidebar";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <div className="my-3 flex w-full gap-6">
        <div className="w-2/5 min-h-full bg-default-100">
          <AdminSidebar />
        </div>
        <div className="w-4/5">{children}</div>
      </div>
    </Container>
  );
};

export default AdminLayout;
