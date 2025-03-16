import React from "react";

const GroupsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto w-full flex-grow min-h-screen mt-20">
      <div className="flex w-full gap-6 justify-center">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default GroupsLayout;
