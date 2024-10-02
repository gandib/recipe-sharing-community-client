"use client";

import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form";
import { useUserlogin } from "@/src/hooks/auth.hook";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/src/components/UI/Loading";
import loginValidationSchema from "../../schemas/login.schemas";
import { useUser } from "@/src/context/user.provider";

const Login = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();
  const { setIsLoading } = useUser();

  console.log(redirect);
  const { mutate: handleUserLogin, isPending, isSuccess } = useUserlogin();

  const onSubmit = (data: FieldValues) => {
    handleUserLogin(data);
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
        <h3 className="my-2 text-2xl font-bold">
          Login with Recipe Sharing Community
        </h3>
        <p>Welcome Back! Let&lsquo;s Get Started</p>
        <div className="w-[35%]">
          <FXForm
            onSubmit={onSubmit}
            resolver={zodResolver(loginValidationSchema)}
          >
            <div className="py-3">
              <FXInput name="email" type="email" label="Email" />
            </div>
            <div className="py-3">
              <FXInput name="password" type="password" label="Password" />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Login
            </Button>
          </FXForm>
          <div className="text-center">
            Don&lsquo;t have an account?{" "}
            <Link href={"/register"}>Register</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
