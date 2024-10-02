import { IInput } from "@/src/types";
import { Textarea } from "@nextui-org/input";
import { useFormContext, useWatch } from "react-hook-form";

interface IProps extends IInput {}

const FXTextarea = ({ name, label, varient = "bordered" }: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const currentValue = useWatch({ name });

  return (
    <Textarea
      {...register(name)}
      label={label}
      minRows={6}
      variant={varient}
      value={currentValue || ""}
    />
  );
};

export default FXTextarea;
