"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import { FieldValues } from "react-hook-form";
import { ChangeEvent, useEffect, useState } from "react";
import Loading from "./Loading";
import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import registerValidationSchema from "@/src/schemas/register.schemas";
import { useGetUser, useUpdateUser } from "@/src/hooks/user.hook";
import updateAdminValidationSchema from "@/src/schemas/update-admin.schema";

export default function AdminCard({
  title,
  email,
}: {
  title: string;
  email?: string;
}) {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const { mutate: handleUserRagistration } = useUserRegistration();
  const { data, isLoading, isPending } = useGetUser(email!);
  const [name, setName] = useState(data?.data?.name);
  const [image, setImage] = useState(data?.data?.image);
  const [bio, setBio] = useState(data?.data?.bio);
  const [id, setId] = useState(data?.data?._id);
  const { mutate: handleUpdate } = useUpdateUser(email!);

  useEffect(() => {
    if (data?.data) {
      setName(data.data.name);
      setImage(data.data.image);
      setBio(data.data.bio);
      setId(data?.data?._id);
    }
  }, [data]);

  const onSubmit = (data: FieldValues) => {
    const formData = new FormData();
    const userData = {
      ...data,
      name: name ? name : data.name,
      image: image ? image : " ",
      bio: bio ? bio : data.bio,
      role: "admin",
    };

    formData.append("data", JSON.stringify(userData));

    formData.append("file", imageFiles[0]);

    if (!email) {
      handleUserRagistration(formData);
    }

    if (email) {
      const updatedData = {
        id: id,
        data: userData,
      };

      handleUpdate(updatedData);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setImageFiles([file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews([reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  if (isLoading || isPending) {
    <Loading />;
  }

  return (
    <div className="flex mt-6 w-full flex-col items-center justify-center mb-12 p-6">
      <div className="flex  w-full flex-col items-center justify-center mb-2 border p-6  sm:w-[90%]  2xl:w-[60%]">
        <h3 className="my-2 text-2xl font-bold">{title}</h3>
        <div className="w-full">
          <FXForm
            resolver={zodResolver(
              email ? updateAdminValidationSchema : registerValidationSchema,
            )}
            onSubmit={onSubmit}
          >
            <div className="py-1">
              <div className="py-2 text-base font-semibold">
                <label htmlFor="Name">Name</label>
              </div>
              <FXInput
                label="Name"
                name="name"
                size="sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {!email && (
              <div className="py-1">
                <div className="py-2 text-base font-semibold">
                  <label htmlFor="Email">Email</label>
                </div>
                <FXInput label="Email" name="email" size="sm" type="email" />
              </div>
            )}
            <div className="py-1">
              <div className="py-2 text-base font-semibold">
                <label htmlFor="Password">Password</label>
              </div>
              <FXInput
                label="Password"
                name="password"
                size="sm"
                type="password"
              />
            </div>
            {email && (
              <div className="py-1">
                <div className="py-2 text-base font-semibold">
                  <label htmlFor="Upload Image">Upload Image</label>
                </div>
                <FXInput
                  label="Image"
                  name="image"
                  size="sm"
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
            )}

            {email && (
              <div className="py-1">
                <div className="py-2 text-base font-semibold">
                  <label htmlFor="Bio">Bio</label>
                </div>
                <FXInput
                  label="Bio"
                  name="bio"
                  size="sm"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            )}
            {!email && (
              <div className="min-w-fit flex-1 h-18">
                <div className="py-2 text-base font-semibold">
                  <label htmlFor="Upload Image">Upload Image</label>
                </div>
                <label
                  className="bg-default-50/10 border-2 p-3 w-full h-full rounded-md flex items-center font-light"
                  htmlFor="image"
                >
                  Upload image
                </label>
                <input
                  className="hidden"
                  id="image"
                  type="file"
                  onChange={(e) => handleImageChange(e)}
                />
              </div>
            )}
            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-5 my-5">
                <div className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2">
                  <img
                    src={imagePreviews[0] as string}
                    //   alt="item"
                    className="h-full w-full object-cover object-center rounded-md"
                  />
                </div>
              </div>
            )}

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Submit
            </Button>
          </FXForm>
        </div>
      </div>
    </div>
  );
}
