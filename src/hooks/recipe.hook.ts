import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { createRecipe } from "../services/Recipe";
import { toast } from "sonner";

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
