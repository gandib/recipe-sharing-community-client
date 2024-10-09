"use server";

import { queryParams } from "@/src/components/UI/AdminDashboardCard";
import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
import axios from "axios";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
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

export const getAllRecipes = async (query: queryParams[]) => {
  const params = new URLSearchParams();
  if (query) {
    query.forEach((item) => {
      params.append(item.name, item.value as string);
    });
  }
  const url = `${envConfig.baseApi}/recipe?${params.toString()}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data!");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

export const getAllMyRecipe = async (query: queryParams[]) => {
  try {
    const params = new URLSearchParams();
    if (query) {
      query.forEach((item) => {
        params.append(item.name, item.value as string);
      });
    }
    const { data } = await axiosInstance.get(`/recipe/my-recipe`, {
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

export const getAllMyRecipes = async (query: queryParams[]) => {
  const params = new URLSearchParams();
  if (query) {
    query.forEach((item) => {
      params.append(item.name, item.value as string);
    });
  }

  const url = `${envConfig.baseApi}/recipe/my-recipe?${params.toString()}`;
  const token = cookies().get("accessToken")?.value;

  try {
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    // Ensure data structure is correct
    if (!data || !data.data.result) {
      throw new Error("Invalid data format");
    }

    return data;
  } catch (error) {
    console.error("Error fetching my recipes:", error);
    throw error;
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

// export const getSingleRecipe = async (id: string) => {
//   try {
//     const { data } = await axiosInstance.get(`/recipe/${id}`);

//     return data;
//   } catch (error: any) {
//     if (axios.isAxiosError(error)) {
//       throw new Error(error?.response?.data?.message);
//     } else {
//       throw new Error(error);
//     }
//   }
// };

export const getSingleRecipe = async (recipeId: string) => {
  let fetchOptions = {};

  fetchOptions = {
    cache: "no-store",
  };
  const res = await fetch(
    `${envConfig.baseApi}/recipe/${recipeId}`,
    fetchOptions
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data!");
  }
  return res.json();
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

export const updateRating = async (ratingData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      `/recipe/rating/${ratingData.id}`,
      ratingData.data
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

export const updateRecipeComment = async (commentData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      `/recipe/comment/${commentData.id}`,
      commentData.data
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

export const deleteRecipeComment = async (commentData: FieldValues) => {
  try {
    const { data } = await axiosInstance.delete(
      `/recipe/comment/${commentData.id}?commentId=${commentData.commentId}`
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
