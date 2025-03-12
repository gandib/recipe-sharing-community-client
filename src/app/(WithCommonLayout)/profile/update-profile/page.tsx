"use client";

import userValidationSchema from "@/src/schemas/user.schema";
import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import FXTextarea from "@/src/components/form/FXTextarea";
import { useUser } from "@/src/context/user.provider";
import { useUpdateUser } from "@/src/hooks/user.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import { FieldValues } from "react-hook-form";

export default function UpdateProfile() {
  const { user, isLoading } = useUser();
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

    handleUpdateUser(profileData!);
  };

  if (isPending) {
    //handle loading state
  }
  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <div className="flex  w-full flex-col items-center justify-center min-h-screen">
      <div className="border w-[90%] md:w-[60%] lg:w-[50%] flex flex-col items-center p-4 rounded-md">
        <h3 className="my-2 text-2xl font-bold">Update Profile</h3>
        <div className="w-full md:w-[90%]">
          <FXForm
            onSubmit={onSubmit}
            resolver={zodResolver(userValidationSchema)}
          >
            <div className="py-1">
              <div className="py-2 text-base font-semibold">
                <label htmlFor="Name">Name</label>
              </div>
              <FXInput name="name" label="Name" size="sm" />
            </div>
            <div className="py-1">
              <div className="py-2 text-base font-semibold">
                <label htmlFor="Image link">Image link</label>
              </div>
              <FXInput name="image" label="Image link" size="sm" />
            </div>
            <div className="py-1">
              <div className="py-2 text-base font-semibold">
                <label htmlFor="Bio">Bio</label>
              </div>
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
    </div>
  );
}
