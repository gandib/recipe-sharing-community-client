"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import FXForm from "../form/FXForm";
import FXInput from "../form/FXInput";
import { Button } from "@nextui-org/react";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useCreateGroup, useUpdateGroup } from "@/src/hooks/group.hook";
import { useUser } from "@/src/context/user.provider";
import { IGroup } from "@/src/types";

const GroupManagementCard = ({
  group,
  title,
}: {
  group?: IGroup;
  title: string;
}) => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const {
    mutate: createGroup,
    isPending,
    isSuccess,
  } = useCreateGroup(user?.email!);
  const { mutate: updateGroup, isSuccess: updateSuccess } = useUpdateGroup(
    user?.email!
  );
  const [name, setName] = useState(group?.name || "");
  const [image, setImage] = useState(group?.image[0] || "");
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const [imgError, setImgError] = useState("");

  useEffect(() => {
    if (group) {
      setName(group.name);
      setImage(group.image[0]);
    }

    if (imageFiles[0]) {
      setImgError("");
    }
  }, [imageFiles, group]);

  const onSubmit = (data: FieldValues) => {
    if (title === "Add" && !imageFiles[0]) {
      setImgError("Please choose an image!");
      return;
    }

    const formData = new FormData();
    const groupData = {
      ...data,
      user: user?._id,
      image: "",
    };

    formData.append("data", JSON.stringify(groupData));

    formData.append("file", imageFiles[0]);

    if (title === "Add") {
      createGroup(formData);
    }

    if (title === "Update") {
      const groupData = {
        id: group?._id,
        data: {
          name: name,
          iamge: image,
        },
      };
      updateGroup(groupData);
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

  if (isPending || isLoading) {
    <p>Loading...</p>;
  }

  useEffect(() => {
    if (isSuccess || updateSuccess) {
      router.push("/groups");
    }
  }, [isSuccess, updateSuccess]);

  return (
    <div>
      <div className="flex mt-2 w-full flex-col items-center justify-center mb-2 border py-6">
        <h3 className="my-2 text-2xl font-bold">{title} Group</h3>
        <div className="w-full p-2 md:w-[90%]">
          <FXForm
            onSubmit={onSubmit}
            // resolver={zodResolver(
            //   id ? updateRecipeValidationSchema : createRecipeValidationSchema
            // )}
          >
            <div className="py-1">
              <div className="py-2 text-base font-semibold">
                <label htmlFor="Title">Title</label>
              </div>
              <FXInput
                name="name"
                label="Enter group name"
                size="sm"
                required={true}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {title === "Update" && (
              <div className="py-1">
                <div className="py-2 text-base font-semibold">
                  <label htmlFor="Title">Upload Image</label>
                </div>
                <FXInput
                  name="image"
                  label="Image"
                  size="sm"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
            )}

            {title === "Add" && (
              <div className="min-w-fit flex-1 h-18">
                <div className="py-2 text-base font-semibold">
                  <label htmlFor="Title">Upload Image</label>
                </div>
                <label
                  className="bg-default-50/10 border-2 p-3 w-full h-full rounded-md flex items-center font-light"
                  htmlFor="image"
                >
                  Upload image
                </label>

                <input
                  className="hidden"
                  type="file"
                  id="image"
                  onChange={(e) => handleImageChange(e)}
                />
              </div>
            )}

            {title === "Add" && imgError && (
              <p className="text-tiny text-red-500">Please choose an image!</p>
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

            <div className="mt-10">
              <Button
                className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
                size="lg"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </FXForm>
        </div>
      </div>
    </div>
  );
};

export default GroupManagementCard;
