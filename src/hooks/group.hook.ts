import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { queryParams } from "../types";
import {
  createGroup,
  createGroupRecipe,
  deleteGroupRecipe,
  deleteGroupRecipeComment,
  getAllGroupRecipe,
  getAllMyGroupRecipe,
  getAllMyGroupTags,
  updateGroup,
  updateGroupDownvote,
  updateGroupRating,
  updateGroupRecipe,
  updateGroupRecipeComment,
  updateGroupRecipeStatus,
  updateGroupUpvote,
} from "../services/GroupService";

export const useCreateGroup = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (recipeData) => await createGroup(recipeData),

    onSuccess(data, variables, context) {
      toast.success(data.message);
      // Invalidate the specific query using the query key with email
      queryClient.invalidateQueries({ queryKey: ["GROUP", email] });
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useCreateGroupRecipe = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (recipeData) => await createGroupRecipe(recipeData),

    onSuccess(data, variables, context) {
      toast.success(data.message);
      // Invalidate the specific query using the query key with email
      queryClient.invalidateQueries({ queryKey: ["GROUP_RECIPE", email] });
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useGetAllGroupRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["GROUP_RECIPE"],
    mutationFn: async (query: queryParams[]) => await getAllGroupRecipe(query),
  });
};

export const useGetAllMyGroupTags = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["GROUP_RECIPE", email],
    mutationFn: async (id: string) => await getAllMyGroupTags(id),
  });
};

export const useGetAllMyGroupRecipe = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["GROUP_RECIPE", email],
    mutationFn: async (query: queryParams[]) =>
      await getAllMyGroupRecipe(query),
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

export const useDeleteGroupRecipe = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (recipeData) => await deleteGroupRecipe(recipeData),

    onSuccess(data, recipeId, context) {
      toast.success(data.message);

      // Update cache for the user's recipes directly
      queryClient.setQueryData(["GROUP_RECIPE", email], (oldData: any) => {
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

export const useUpdateGroup = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (groupData) => await updateGroup(groupData),

    onSuccess(data, variables, context) {
      toast.success(data.message);
      // Invalidate the specific query using the query key with email
      queryClient.invalidateQueries({ queryKey: ["GROUP_RECIPE", email] });
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useUpdateGroupRecipe = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (recipeData) => await updateGroupRecipe(recipeData),

    onSuccess(data, variables, context) {
      toast.success(data.message);
      // Invalidate the specific query using the query key with email
      queryClient.invalidateQueries({ queryKey: ["GROUP_RECIPE", email] });
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

export const useUpdateGroupUpvote = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (upvoteData) => await updateGroupUpvote(upvoteData),

    onSuccess(data, variables, context) {
      toast.success(data.message);
      // Invalidate the specific query using the query key with email
      queryClient.invalidateQueries({ queryKey: ["GROUP_RECIPE", email] });
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useUpdateGroupDownvote = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (downvoteData) => await updateGroupDownvote(downvoteData),

    onSuccess(data, variables, context) {
      toast.success(data.message);
      // Invalidate the specific query using the query key with email
      queryClient.invalidateQueries({ queryKey: ["GROUP_RECIPE", email] });
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useUpdateGroupRating = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (ratingData) => await updateGroupRating(ratingData),

    onSuccess(data, variables, context) {
      toast.success(data.message);
      // Invalidate the specific query using the query key with email
      queryClient.invalidateQueries({ queryKey: ["GROUP_RECIPE", email] });
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useUpdateGroupRecipeComment = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (commentData) =>
      await updateGroupRecipeComment(commentData),

    onSuccess(data, variables, context) {
      toast.success(data.message);
      // Invalidate the specific query using the query key with email
      queryClient.invalidateQueries({ queryKey: ["GROUP_RECIPE", email] });
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useDeleteGroupRecipeComment = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (commentData) =>
      await deleteGroupRecipeComment(commentData),

    onSuccess(data, variables, context) {
      toast.success(data.message);
      // Invalidate the specific query using the query key with email
      queryClient.invalidateQueries({ queryKey: ["GROUP_RECIPE", email] });
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useUpdateGroupRecipeStatus = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (recipeData) => await updateGroupRecipeStatus(recipeData),

    onSuccess(data, variables, context) {
      toast.success(data.message);
      // Invalidate the specific query using the query key with email
      queryClient.invalidateQueries({ queryKey: ["GROUP_RECIPE", email] });
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};
