"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const SeeDetailButton = ({ id }: { id: string }) => {
  const router = useRouter();

  return (
    <Button
      className=""
      size="sm"
      onClick={() => router.push(`/profile/${id}`)}
    >
      See Detail
    </Button>
  );
};

export default SeeDetailButton;
