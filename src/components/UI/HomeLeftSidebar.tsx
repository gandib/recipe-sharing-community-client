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
            className="flex justify-start items-center gap-2 font-semibold"
            href={"/"}
          >
            <Home
              className="border-2 w-8 h-8 p-1 bg-default-300 rounded-full "
              size={20}
            />
            Home
          </Link>
        </div>

        <div>
          <Link
            className="flex justify-start items-center gap-2 font-semibold"
            href={"/profile"}
          >
            <User
              className="border-2 w-8 h-8 p-1 bg-default-300 rounded-full "
              size={20}
            />
            My Profile
          </Link>
        </div>

        <div>
          <Link
            className="flex justify-start items-center gap-2 font-semibold"
            href={"/groups"}
          >
            <Group
              className="border-2 w-8 h-8 p-1 bg-default-300 rounded-full "
              size={20}
            />
            Groups
          </Link>
        </div>

        <div>
          <Link
            className="flex justify-start items-center gap-2 font-semibold"
            href={"/contact"}
          >
            <Contact
              className="border-2 w-8 h-8 p-1 bg-default-300 rounded-full "
              size={20}
            />{" "}
            Contact Us
          </Link>
        </div>

        <div>
          <Link
            className="flex justify-start items-center gap-2 font-semibold"
            href={"/about"}
          >
            <Info
              className="border-2 w-8 h-8 p-1 bg-default-300 rounded-full "
              size={20}
            />{" "}
            About Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeLeftSidebar;
