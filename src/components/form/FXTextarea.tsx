import { Textarea } from "@nextui-org/react";
import { useFormContext, useWatch } from "react-hook-form";
import { IInput } from "@/src/types";

interface IProps extends IInput {}

const FXTextarea = ({
  name,
  label,
  varient = "bordered",
  disabled,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const currentValue = useWatch({ name });

  return (
    <Textarea
      {...register(name)}
      disabled={disabled}
      label={label}
      minRows={6}
      value={currentValue || ""}
      variant={varient}
    />
  );
};

export default FXTextarea;
