import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { getUser, updateUser } from "../services/UserService";
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

export const useGetUser = (email: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["USER", email],
    queryFn: async () => await getUser(email),
  });
};
