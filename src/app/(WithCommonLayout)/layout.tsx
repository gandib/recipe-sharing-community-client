"use client";

import { usePathname } from "next/navigation";
import { NavbarLower } from "@/src/components/UI/NavbarLower";

export default function layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="relative flex flex-col min-h-screen">
      <NavbarLower />
      {/* {pathname !== "/login" && <NavbarLower />} */}
      <main>{children}</main>
    </div>
  );
}
