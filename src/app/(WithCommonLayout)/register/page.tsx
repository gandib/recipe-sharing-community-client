"use client";

import FXForm from "@/src/components/form/FXForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { ChangeEvent, useEffect, useState } from "react";
import "../../../../src/styles/animation.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import loginPic from "@/src/assets/login2.jpg";
import registerValidationSchema from "@/src/schemas/register.schemas";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import FXInput from "@/src/components/form/FXInput";

export default function Register() {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const {
    mutate: handleUserRagistration,
    isPending,
    isSuccess,
  } = useUserRegistration();
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

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

  useEffect(() => {
    if (!isPending && isSuccess) {
      router.push("/login");
    }
  }, [isPending, isSuccess, router]);

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="hidden lg:flex">
        <Image alt="login" height={1000} src={loginPic} width={1000} />
      </div>
      <div className="flex mt-6 w-full flex-col items-center justify-center mb-12">
        {/* {isPending && <Loading />} */}
        <h3 className="my-2 text-2xl font-bold">
          Register with Recipe Sharing
        </h3>
        <div className="md:w-[50%] lg:w-[35%] w-[80%]">
          <FXForm
            resolver={zodResolver(registerValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <FXInput label="Name" name="name" size="sm" />
            </div>
            <div className="py-3">
              <FXInput label="Email" name="email" size="sm" type="email" />
            </div>
            <div className="py-3">
              <FXInput
                label="Password"
                name="password"
                size="sm"
                type="password"
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
                id="image"
                type="file"
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
