"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import axios from "axios";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const updateUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      `/auth/update-user?id=${userData.id}`,
      userData.data
    );
    revalidateTag("USER");

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const updateUnfollowing = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      `/auth/update-unfollowing?id=${userData.id}`,
      userData.data
    );
    revalidateTag("USER");

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const updateFollowing = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      `/auth/update-unfollowing?id=${userData.id}`,
      userData.data
    );
    revalidateTag("USER");

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const getUser = async (email: string) => {
  try {
    const { data } = await axiosInstance.get(`/auth/${email}`);

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};
