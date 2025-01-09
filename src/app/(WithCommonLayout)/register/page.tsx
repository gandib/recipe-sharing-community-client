"use client";

import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { ChangeEvent, useEffect, useState } from "react";
import registerValidationSchema from "@/src/schemas/register.schemas";
import "../../../../src/styles/animation.css";

export default function Register() {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const { mutate: handleUserRagistration, isPending } = useUserRegistration();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    return () => {
      setIsVisible(false);
    };
  }, []);

  const onSubmit = (data: FieldValues) => {
    const formData = new FormData();
    const userData = {
      ...data,
      image: " ",
      role: "user",
    };

    formData.append("data", JSON.stringify(userData));

    formData.append("file", imageFiles[0]);

    handleUserRagistration(formData);
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

  if (isPending) {
    //handle loading state
  }

  return (
    <div
      className={`transition-opacity duration-500 ${isVisible ? "fade-enter-active" : "fade-enter"}`}
    >
      <div className="flex mt-6 w-full flex-col items-center justify-center mb-12">
        <h3 className="my-2 text-2xl font-bold">
          Register with Recipe Sharing
        </h3>
        <div className="md:w-[50%] lg:w-[35%] w-[80%]">
          <FXForm
            onSubmit={onSubmit}
            resolver={zodResolver(registerValidationSchema)}
          >
            <div className="py-3">
              <FXInput name="name" label="Name" size="sm" />
            </div>
            <div className="py-3">
              <FXInput name="email" type="email" label="Email" size="sm" />
            </div>
            <div className="py-3">
              <FXInput
                name="password"
                type="password"
                label="Password"
                size="sm"
              />
            </div>
            <div className="min-w-fit flex-1 h-12">
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
              Registration
            </Button>
          </FXForm>
          <div className="text-center">
            Already have an account?{" "}
            <Link href={"/login"}>
              <span className="cursor-pointer hover:text-green-500">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
