"use server";
import axiosInstance from "@/src/lib/AxiosInstance";
import axios from "axios";
import { FieldValues } from "react-hook-form";

export const membershipPayment = async (paymentData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/payment/initiate", paymentData);

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};
