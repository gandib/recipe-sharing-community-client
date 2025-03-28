"use client";

import { Button } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useRecoverPassword } from "@/src/hooks/auth.hook";
import FXInput from "@/src/components/form/FXInput";
import FXForm from "@/src/components/form/FXForm";
import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";
import recoverPasswordValidationSchema from "@/src/schemas/recover-password.schemas";

const RecoverPassword = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();
  const { setIsLoading } = useUser();

  const {
    mutate: handleRecoverPassword,
    isPending,
    isSuccess,
  } = useRecoverPassword();

  const onSubmit = (data: FieldValues) => {
    const recoverData = {
      token: searchParams?.get("token"),
      data: {
        id: searchParams?.get("id"),
        newPassword: data.newPassword,
      },
    };

    handleRecoverPassword(recoverData);
    setIsLoading(true);
  };

  if (!isPending && isSuccess) {
    if (redirect) {
      router.push(redirect);
    } else {
      router.push("/");
    }
  }

  return (
    <>
      {isPending && <Loading />}
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center ">
        <h3 className="my-2 text-2xl font-bold">Recover Password</h3>
        <div className="w-[35%]">
          <FXForm
            resolver={zodResolver(recoverPasswordValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <FXInput label="Password" name="newPassword" type="password" />
            </div>

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
    </>
  );
};

export default RecoverPassword;
