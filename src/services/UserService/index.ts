"use server";

import axios from "axios";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";
import axiosInstance from "@/src/lib/AxiosInstance";

export const updateUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      `/auth/update-user?id=${userData.id}`,
      userData.data,
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
      userData.data,
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

export const updateUserStatus = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      `/auth/update-user-status?id=${userData.id}`,
      userData.data,
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

export const deleteUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.delete(
      `/auth/delete-user?id=${userData.id}`,
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
      `/auth/update-following?id=${userData.id}`,
      userData.data,
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

export const getUserById = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/auth/user-by-id/${id}`);

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const getAllUser = async () => {
  try {
    const { data } = await axiosInstance.get(`/auth/all-user`);

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const getAllAdmin = async () => {
  try {
    const { data } = await axiosInstance.get(`/auth/all-admin`);

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};
