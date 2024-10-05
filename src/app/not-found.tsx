"use client";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center mt-24">
      <div>
        <h1 className="text-red-500 text-2xl">Oops! No Found!</h1>
        <Button className="mt-6 bg-purple-500" onClick={() => router.push("/")}>
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
