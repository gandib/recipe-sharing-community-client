"use client";

import { Input } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";
import { IInput } from "@/src/types";

interface IProps extends IInput {}

const FXInput = ({
  varient = "bordered",
  size = "sm",
  required = false,
  type = "text",
  label,
  name,
  onChange,
  value,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      {...register(name)}
      errorMessage={
        errors[name]?.message ? (errors[name]?.message as string) : ""
      }
      isInvalid={!!errors[name]}
      label={label}
      required={required}
      size={size}
      type={type}
      value={value}
      variant={varient}
      onChange={onChange!}
    />
  );
};

export default FXInput;
