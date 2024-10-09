"use client";

import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

const SeeDetailButton = ({ id }: { id: string }) => {
  const router = useRouter();

  return (
    <Button
      size="sm"
      onClick={() => router.push(`/profile/${id}`)}
      className=""
    >
      See Detail
    </Button>
  );
};

export default SeeDetailButton;
