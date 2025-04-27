import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteApplication,
  getApplications,
  postApplication,
  putApplication,
} from "../APIs/ApplicationApi";

export const useApplication = () => {
  const queryClient = useQueryClient();
  const applicationQueries = useQuery({
    queryKey: ["Applications"],
    queryFn: getApplications,
  });
  const deleteApplicationMutation = useMutation({
    mutationFn: deleteApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Applications"] });
    },
  });
  const postApplicationMutation = useMutation({
    mutationFn: postApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Applications"] });
    },
  });
  const putApplicationMutation = useMutation({
    mutationFn: putApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Applications"] });
    },
  });
  return {
    applicationQueries,
    deleteApplicationMutation,
    postApplicationMutation,
    putApplicationMutation,
  };
};
