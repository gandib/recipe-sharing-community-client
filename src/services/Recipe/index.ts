"use server";
import axiosInstance from "@/src/lib/AxiosInstance";
import axios from "axios";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createRecipe = async (recipeData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      `/recipe/create-recipe`,
      recipeData
    );
    revalidateTag("RECIPE");

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};
