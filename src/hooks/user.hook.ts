import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import {
  deleteUser,
  getAllAdmin,
  getAllUser,
  getUser,
  getUserById,
  updateFollowing,
  updateUnfollowing,
  updateUser,
  updateUserStatus,
} from "../services/UserService";
import next from "next";

export const useUpdateUser = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (userData) => await updateUser(userData),

    onSuccess(data, variables, context) {
      toast.success(data.message);
      // Invalidate the specific query using the query key with email
      queryClient.invalidateQueries({ queryKey: ["USER", email] });
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useUpdateUnfollowing = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (userData) => await updateUnfollowing(userData),

    onSuccess(data, variables, context) {
      toast.success(data.message);
      // Invalidate the specific query using the query key with email
      queryClient.invalidateQueries({ queryKey: ["USER", email] });
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useUpdateFollowing = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (userData) => await updateFollowing(userData),

    onSuccess(data, variables, context) {
      toast.success(data.message);
      // Invalidate the specific query using the query key with email
      queryClient.invalidateQueries({ queryKey: ["USER", email] });
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useUpdateUserStatus = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (userData) => await updateUserStatus(userData),

    onSuccess(data, variables, context) {
      toast.success(data.message);
      // Invalidate the specific query using the query key with email
      queryClient.invalidateQueries({ queryKey: ["USER", email] });
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useDeleteUser = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (userData) => await deleteUser(userData),

    onSuccess(data, variables, context) {
      toast.success(data.message);
      // Invalidate the specific query using the query key with email
      queryClient.invalidateQueries({ queryKey: ["USER", email] });
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useGetUser = (email: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["USER", email],
    queryFn: async () => await getUser(email),
  });
};

export const useGetUserById = (id: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["USER", id],
    queryFn: async () => await getUserById(id),
  });
};

export const useGetAllUser = (email: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["USER", email],
    queryFn: async () => await getAllUser(),
  });
};

export const useGetAllAdmin = (email: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["USER", email],
    queryFn: async () => await getAllAdmin(),
  });
};
