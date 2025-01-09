"use client";
import { Navbar } from "@/src/components/UI/navbar";
import { NavbarLower } from "@/src/components/UI/NavbarLower";
import { usePathname } from "next/navigation";

export default function layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      {pathname !== "/login" && <NavbarLower />}
      <main>{children}</main>
    </div>
  );
}
