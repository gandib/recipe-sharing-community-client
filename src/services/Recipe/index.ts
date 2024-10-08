"use server";
import { queryParams } from "@/src/app/(WithCommonLayout)/(admin)/admin-dashboard/all-recipe/page";
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

export const getAllRecipe = async (query: queryParams[]) => {
  try {
    const params = new URLSearchParams();
    console.log(query);
    if (query) {
      query.forEach((item) => {
        params.append(item.name, item.value as string);
      });
    }
    const { data } = await axiosInstance.get(`/recipe`, {
      params: params,
    });

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const getAllMyRecipe = async (query: {
  id: string;
  query: queryParams[];
}) => {
  try {
    const params = new URLSearchParams();
    console.log(query);
    if (query) {
      query.query.forEach((item) => {
        params.append(item.name, item.value as string);
      });
    }
    const { data } = await axiosInstance.get(`/recipe/my-recipe/${query.id}`, {
      params: params,
    });

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const getAllMyTags = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/recipe/my-tags/${id}`);

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const deleteRecipe = async (recipeData: string) => {
  try {
    const { data } = await axiosInstance.delete(`/recipe/${recipeData}`);
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

export const updateRecipe = async (recipeData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      `/recipe/${recipeData.id}`,
      recipeData.data
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

export const getSingleRecipe = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/recipe/${id}`);

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const updateUpvote = async (upvoteData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      `/recipe/upvote/${upvoteData.id}`,
      upvoteData.data
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

export const updateDownvote = async (downvoteData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      `/recipe/downvote/${downvoteData.id}`,
      downvoteData.data
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
