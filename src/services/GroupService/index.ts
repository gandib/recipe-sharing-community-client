"use server";

import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
import { queryParams } from "@/src/types";
import axios from "axios";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createGroup = async (recipeData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      `/group/create-group`,
      recipeData
    );
    revalidateTag("GROUP");

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const createGroupRecipe = async (recipeData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      `/group/create-group-post/${recipeData.id}`,
      recipeData.data
    );
    revalidateTag("GROUP_RECIPE");

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const getAllGroupRecipe = async (query: queryParams[]) => {
  try {
    const params = new URLSearchParams();
    if (query) {
      query.forEach((item) => {
        params.append(item.name, item.value as string);
      });
    }
    const { data } = await axiosInstance.get(`/group`, {
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

export const getAllGroupRecipes = async (query: queryParams[]) => {
  const params = new URLSearchParams();
  if (query) {
    query.forEach((item) => {
      params.append(item.name, item.value as string);
    });
  }
  const url = `${envConfig.baseApi}/group?${params.toString()}`;
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
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

export const getAllGroups = async (query: queryParams[]) => {
  const params = new URLSearchParams();
  if (query) {
    query.forEach((item) => {
      params.append(item.name, item.value as string);
    });
  }
  const url = `${envConfig.baseApi}/group`;
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
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

export const getAllMyGroups = async (query: queryParams[]) => {
  const params = new URLSearchParams();
  if (query) {
    query.forEach((item) => {
      params.append(item.name, item.value as string);
    });
  }
  const url = `${envConfig.baseApi}/group/my-group`;
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
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

export const getAllGroupRecipeForStatusChange = async () => {
  const url = `${envConfig.baseApi}/group/all-recipe`;

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

export const getAllMyGroupRecipe = async (query: queryParams[]) => {
  try {
    const params = new URLSearchParams();
    if (query) {
      query.forEach((item) => {
        params.append(item.name, item.value as string);
      });
    }
    const { data } = await axiosInstance.get(`/group/my-recipe`, {
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

export const getAllMyGroupRecipes = async (query: queryParams[]) => {
  const params = new URLSearchParams();
  if (query) {
    query.forEach((item) => {
      params.append(item.name, item.value as string);
    });
  }

  const url = `${envConfig.baseApi}/group/my-recipe?${params.toString()}`;
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

export const getAllMyGroupTags = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/group/my-tags`);

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const getAllMyGroupTag = async () => {
  const url = `${envConfig.baseApi}/group/my-tags`;
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

    return data;
  } catch (error) {
    console.error("Error fetching my recipes:", error);
    throw error;
  }
};

export const getAllGroupTag = async () => {
  const url = `${envConfig.baseApi}/group/all-tags`;
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

    return data;
  } catch (error) {
    console.error("Error fetching my recipes:", error);
    throw error;
  }
};

export const deleteGroupRecipe = async (recipeData: string) => {
  try {
    const { data } = await axiosInstance.delete(`/group/${recipeData}`);
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

export const updateGroup = async (groupData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      `/group/${groupData.id}`,
      groupData.data
    );
    revalidateTag("GROUP_RECIPE");

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const updateGroupRecipe = async (recipeData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      `/group/${recipeData.id}`,
      recipeData.data
    );
    revalidateTag("GROUP_RECIPE");

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

export const getSingleGroupRecipe = async (recipeId: string) => {
  let fetchOptions = {};
  const token = cookies().get("accessToken")?.value;

  fetchOptions = {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await fetch(
    `${envConfig.baseApi}/group/${recipeId}`,
    fetchOptions
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data!");
  }
  return res.json();
};

export const updateGroupUpvote = async (upvoteData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      `/group/upvote/${upvoteData.id}`,
      upvoteData.data
    );
    revalidateTag("GROUP_RECIPE");

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const updateGroupDownvote = async (downvoteData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      `/group/downvote/${downvoteData.id}`,
      downvoteData.data
    );
    revalidateTag("GROUP_RECIPE");

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const updateGroupRating = async (ratingData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      `/group/rating/${ratingData.id}`,
      ratingData.data
    );
    revalidateTag("GROUP_RECIPE");

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const updateGroupRecipeComment = async (commentData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      `/group/comment/${commentData.id}`,
      commentData.data
    );
    revalidateTag("GROUP_RECIPE");

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const deleteGroupRecipeComment = async (commentData: FieldValues) => {
  try {
    const { data } = await axiosInstance.delete(
      `/group/comment/${commentData.id}?commentId=${commentData.commentId}`
    );
    revalidateTag("GROUP_RECIPE");

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const updateGroupRecipeStatus = async (recipeData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      `/group/status/${recipeData.id}`,
      recipeData.data
    );
    revalidateTag("GROUP_RECIPE");

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};
