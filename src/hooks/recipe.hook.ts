import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import {
  createRecipe,
  deleteRecipe,
  getAllMyRecipe,
  getAllRecipe,
  getSingleRecipe,
  updateRecipe,
} from "../services/Recipe";
import { toast } from "sonner";
import { queryParams } from "../app/(WithCommonLayout)/(admin)/admin-dashboard/all-recipe/page";

export const useCreateRecipe = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (recipeData) => await createRecipe(recipeData),

    onSuccess(data, variables, context) {
      toast.success(data.message);
      // Invalidate the specific query using the query key with email
      queryClient.invalidateQueries({ queryKey: ["RECIPE", email] });
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useGetAllRecipe = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["RECIPE", email],
    mutationFn: async (query: queryParams[]) => await getAllRecipe(query),
  });
};

export const useGetAllMyRecipe = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["RECIPE", email],
    mutationFn: async (query: { id: string; query: queryParams[] }) =>
      await getAllMyRecipe(query),
  });
};

export const useDeleteRecipe = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationFn: async (recipeData) => await deleteRecipe(recipeData),

    onSuccess(data, variables, context) {
      toast.success(data.message);
      // Invalidate the specific query using the query key with email
      queryClient.invalidateQueries({ queryKey: ["RECIPE", email] });
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useUpdateRecipe = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (recipeData) => await updateRecipe(recipeData),

    onSuccess(data, variables, context) {
      toast.success(data.message);
      // Invalidate the specific query using the query key with email
      queryClient.invalidateQueries({ queryKey: ["RECIPE", email] });
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useGetSingleRecipe = (id: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["RECIPE", id],
    queryFn: async () => await getSingleRecipe(id),
  });
};
