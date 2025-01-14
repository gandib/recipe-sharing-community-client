"use client";

import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { useForgetPassword, useUserlogin } from "@/src/hooks/auth.hook";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";
import { useEffect, useState } from "react";
import loginValidationSchema from "@/src/schemas/login.schemas";
import "../../../../src/styles/animation.css";
import loginPic from "@/src/assets/login2.jpg";
import Image from "next/image";

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const searchParams = useSearchParams();
  const redirect = searchParams?.get("redirect");
  const router = useRouter();
  const { setIsLoading } = useUser();
  const [error, setError] = useState("");

  const { mutate: handleUserLogin, isPending, isSuccess } = useUserlogin();
  const { mutate: handleForgetPassword } = useForgetPassword();

  useEffect(() => {
    setIsVisible(true);

    return () => {
      setIsVisible(false);
    };
  }, []);

  const { register, handleSubmit, setValue, watch } = useForm({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: { email: "", password: "" },
  });

  const email = watch("email");
  const password = watch("password");

  const onSubmit = (data: FieldValues) => {
    handleUserLogin(data);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      const target = redirect || "/";
      router.push(target);
    }
  }, [isPending, isSuccess, redirect, router]);

  const recoverPassword = (email: string) => {
    const data = { email };
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(email)) {
      setError("Please enter a valid email!");
    } else {
      setError("");
      handleForgetPassword(data);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="hidden lg:flex">
        <Image src={loginPic} width={1000} height={1000} alt="login" />
      </div>
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center ">
        {isPending && <Loading />}
        <h3 className="my-2 text-2xl font-bold">Login with Recipe Sharing</h3>
        <p>Welcome Back! Let&lsquo;s Get Started</p>

        <div className="flex p-2">
          <p className="font-bold">Credential:</p>
          <Button
            onPress={() => {
              setValue("email", "gandibroy11@gmail.com");
              setValue("password", "123456");
            }}
            size="sm"
            className="mx-2 bg-primary-500 text-white"
          >
            User
          </Button>
          <Button
            onPress={() => {
              setValue("email", "admin@gmail.com");
              setValue("password", "123456");
            }}
            size="sm"
            className="bg-purple-600 text-white"
          >
            Admin
          </Button>
        </div>

        <div className="md:w-[50%] lg:w-[35%] w-[80%]">
          <FXForm
            onSubmit={handleSubmit(onSubmit)}
            // resolver={zodResolver(loginValidationSchema)}
          >
            <div className="py-3">
              <FXInput
                {...register("email")}
                // onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setValue("email", e.target.value)}
              />
            </div>
            <span className="text-sm text-rose-600">{error}</span>
            <div className="py-3">
              <FXInput
                {...register("password")}
                name="password"
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setValue("password", e.target.value)}
              />
            </div>

            <div className="py-3">
              <p
                className="cursor-pointer hover:text-green-500"
                onClick={() => recoverPassword(email)}
              >
                Forgot Password?
              </p>
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
            <Link href={"/register"}>
              <span className="cursor-pointer hover:text-green-500">
                Register
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
