import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { membershipPayment } from "../services/Payment";

export const useMembershipPayment = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_PAYMENT"],
    mutationFn: async (paymentData) => await membershipPayment(paymentData),
    onSuccess(data, variables, context) {
      toast.success(data.message);
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};
