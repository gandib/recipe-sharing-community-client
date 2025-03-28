import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import {
  createRecipe,
  deleteRecipe,
  deleteRecipeComment,
  getAllMyRecipe,
  getAllMyTags,
  getAllRecipe,
  updateDownvote,
  updateRating,
  updateRecipe,
  updateRecipeComment,
  updateRecipeStatus,
  updateUpvote,
} from "../services/Recipe";
import { queryParams } from "../types";

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

export const useGetAllRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["RECIPE"],
    mutationFn: async (query: queryParams[]) => await getAllRecipe(query),
  });
};

export const useGetAllMyTags = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["RECIPE", email],
    mutationFn: async (id: string) => await getAllMyTags(id),
  });
};

export const useGetAllMyRecipe = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["RECIPE", email],
    mutationFn: async (query: queryParams[]) => await getAllMyRecipe(query),
  });
};

// export const useDeleteRecipe = (email: string) => {
//   const queryClient = useQueryClient();

//   return useMutation<any, Error, string>({
//     mutationFn: async (recipeData) => await deleteRecipe(recipeData),

//     onSuccess(data, variables, context) {
//       toast.success(data.message);
//       // Invalidate the specific query using the query key with email
//       queryClient.invalidateQueries({ queryKey: ["RECIPE", email] });
//     },
//     onError(error, variables, context) {
//       toast.error(error.message);
//     },
//   });
// };

export const useDeleteRecipe = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationFn: async (recipeData) => await deleteRecipe(recipeData),

    onSuccess(data, recipeId, context) {
      toast.success(data.message);

      // Update cache for the user's recipes directly
      queryClient.setQueryData(["RECIPE", email], (oldData: any) => {
        if (!oldData) return;

        // Filter out the deleted recipe by ID
        const updatedRecipes = oldData.result.filter(
          (recipe: any) => recipe._id !== recipeId,
        );

        // Return updated data
        return {
          ...oldData,
          result: updatedRecipes, // Update the result array
        };
      });
    },

    onError(error, recipeId, context) {
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

// export const useGetSingleRecipe = (id: string) => {
//   const queryClient = useQueryClient();

//   return useQuery({
//     queryKey: ["RECIPE", id],
//     queryFn: async () => await getSingleRecipe(id),
//   });
// };

export const useUpdateUpvote = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (upvoteData) => await updateUpvote(upvoteData),

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

export const useUpdateDownvote = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (downvoteData) => await updateDownvote(downvoteData),

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

export const useUpdateRating = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (ratingData) => await updateRating(ratingData),

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

export const useUpdateRecipeComment = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (commentData) => await updateRecipeComment(commentData),

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

export const useDeleteRecipeComment = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (commentData) => await deleteRecipeComment(commentData),

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

export const useUpdateRecipeStatus = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (recipeData) => await updateRecipeStatus(recipeData),

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
