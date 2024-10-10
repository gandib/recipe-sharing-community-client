"use client";

import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form";
import { useForgetPassword, useUserlogin } from "@/src/hooks/auth.hook";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";
import { useEffect, useState } from "react";
import loginValidationSchema from "@/src/schemas/login.schemas";
import "../../../../src/styles/animation.css";

const Login = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams?.get("redirect");
  const router = useRouter();
  const { setIsLoading } = useUser();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    return () => {
      setIsVisible(false);
    };
  }, []);

  console.log(redirect);
  const { mutate: handleUserLogin, isPending, isSuccess } = useUserlogin();
  const { mutate: handleForgetPassword } = useForgetPassword();

  const onSubmit = (data: FieldValues) => {
    setEmail(data.email);
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

  const recoverPassword = (email: string) => {
    const data = {
      email,
    };
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(email)) {
      setError("Please enter a valid email!");
    } else {
      setError("");
      handleForgetPassword(data);
    }
  };

  return (
    <div
      className={`transition-opacity duration-500 ${isVisible ? "fade-enter-active" : "fade-enter"}`}
    >
      {isPending && <Loading />}
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center ">
        <h3 className="my-2 text-2xl font-bold">Login with Recipe Sharing</h3>
        <p>Welcome Back! Let&lsquo;s Get Started</p>
        <div className="md:w-[50%] lg:w-[35%] w-[80%]">
          <FXForm
            onSubmit={onSubmit}
            resolver={zodResolver(loginValidationSchema)}
          >
            <div className="py-3">
              <FXInput
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                label="Email"
              />
            </div>
            <span className="text-sm text-rose-600">{error}</span>
            <div className="py-3">
              <FXInput name="password" type="password" label="Password" />
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
