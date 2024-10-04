"use client";

import userValidationSchema from "@/src/schemas/user.schema";
import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import FXTextarea from "@/src/components/form/FXTextarea";
import { useUser } from "@/src/context/user.provider";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import { useUpdateUser } from "@/src/hooks/user.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FieldValues } from "react-hook-form";

export default function UpdateProfile() {
  const { user } = useUser();
  const { mutate: handleUpdateUser, isPending } = useUpdateUser(user?.email!);

  interface IData {
    id: string;
    data: {
      name?: string;
      image?: string;
      bio?: string;
    };
  }

  const onSubmit = (data: FieldValues) => {
    let profileData: IData = {
      id: user?._id!,
      data: {},
    };

    if (data?.name) {
      profileData.data.name = data.name;
    }

    if (data?.image) {
      profileData.data.image = data.image;
    }

    if (data?.bio) {
      profileData.data.bio = data.bio;
    }

    console.log("inside", profileData);

    handleUpdateUser(profileData!);
  };

  if (isPending) {
    //handle loading state
  }

  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center ">
      <h3 className="my-2 text-2xl font-bold">Update Profile</h3>
      <div className="w-[80%]">
        <FXForm
          onSubmit={onSubmit}
          resolver={zodResolver(userValidationSchema)}
        >
          <div className="py-3">
            <FXInput name="name" label="Name" size="sm" />
          </div>
          <div className="py-3">
            <FXInput name="image" label="Image" size="sm" />
          </div>
          <div className="py-3">
            <FXTextarea name="bio" label="Bio" size="sm" />
          </div>

          <Button
            className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
            size="lg"
            type="submit"
          >
            Update
          </Button>
        </FXForm>
      </div>
    </div>
  );
}
