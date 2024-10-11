"use client";

import userValidationSchema from "@/src/schemas/user.schema";
import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import { useUser } from "@/src/context/user.provider";
import { useUpdateUser } from "@/src/hooks/user.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { FieldValues } from "react-hook-form";

export default function ChangePassword() {
  const { user, isLoading } = useUser();
  const { mutate: handleUpdateUser, isPending } = useUpdateUser(user?.email!);

  const onSubmit = (data: FieldValues) => {
    let profileData = {
      id: user?._id!,
      data: data,
    };

    handleUpdateUser(profileData!);
  };

  if (isPending) {
    //handle loading state
  }

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center ">
      <h3 className="my-2 text-2xl font-bold">Update Password</h3>
      <div className="w-full md:w-[80%]">
        <FXForm
          onSubmit={onSubmit}
          resolver={zodResolver(userValidationSchema)}
        >
          <div className="py-3">
            <FXInput name="password" label="Password" size="sm" />
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
