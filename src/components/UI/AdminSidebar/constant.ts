"use client";
import { TLinkItem } from "@/src/types";
import {
  CircleCheckBig,
  LayoutDashboard,
  Soup,
  UserRound,
  UserRoundPen,
  UserRoundPlus,
} from "lucide-react";

export const adminLinks: TLinkItem[] = [
  { href: "/admin-dashboard", label: "Dashboard", icon: LayoutDashboard },
  {
    href: "/admin-dashboard/user-management",
    label: "User Management",
    icon: UserRoundPen,
  },
  {
    href: "/admin-dashboard/create-recipe",
    label: "Create Recipe",
    icon: Soup,
  },
  { href: "/admin-dashboard/all-admin", label: "All Admins", icon: UserRound },
  {
    href: "/admin-dashboard/create-admin",
    label: "Create Admins",
    icon: UserRoundPlus,
  },
  {
    href: "/admin-dashboard/status-change",
    label: "Status Change",
    icon: CircleCheckBig,
  },
  {
    href: "/admin-dashboard/update-profile",
    label: "Update Profile",
    icon: UserRoundPen,
  },
];
