"use client";

import { Contact, Group, Home, Info, User } from "lucide-react";
import Link from "next/link";

const HomeLeftSidebar = () => {
  return (
    <div className="w-full min-h-[200px] bg-default-100 rounded p-4">
      <h1 className=" font-bold pb-4">Quick Links</h1>
      <div className="flex flex-col gap-4">
        <div>
          <Link
            href={"/"}
            className="flex justify-start items-center gap-2 font-semibold"
          >
            <Home
              size={20}
              className="border-2 w-8 h-8 p-1 bg-default-300 rounded-full "
            />
            Home
          </Link>
        </div>

        <div>
          <Link
            href={"/profile"}
            className="flex justify-start items-center gap-2 font-semibold"
          >
            <User
              size={20}
              className="border-2 w-8 h-8 p-1 bg-default-300 rounded-full "
            />
            My Profile
          </Link>
        </div>

        <div>
          <Link
            href={"/groups"}
            className="flex justify-start items-center gap-2 font-semibold"
          >
            <Group
              size={20}
              className="border-2 w-8 h-8 p-1 bg-default-300 rounded-full "
            />
            Groups
          </Link>
        </div>

        <div>
          <Link
            href={"/contact"}
            className="flex justify-start items-center gap-2 font-semibold"
          >
            <Contact
              size={20}
              className="border-2 w-8 h-8 p-1 bg-default-300 rounded-full "
            />{" "}
            Contact Us
          </Link>
        </div>

        <div>
          <Link
            href={"/about"}
            className="flex justify-start items-center gap-2 font-semibold"
          >
            <Info
              size={20}
              className="border-2 w-8 h-8 p-1 bg-default-300 rounded-full "
            />{" "}
            About Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeLeftSidebar;
