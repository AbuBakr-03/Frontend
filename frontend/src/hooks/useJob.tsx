import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { deleteJob, getJobs, postJob, putJob } from "../APIs/JobApi";

export const useJob = () => {
  const queryClient = useQueryClient();
  const jobQueries = useQuery({
    queryKey: ["Jobs"],
    queryFn: getJobs,
  });
  const deleteJobMutation = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Jobs"] });
    },
  });
  const postJobMutation = useMutation({
    mutationFn: postJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Jobs"] });
    },
  });
  const putJobMutation = useMutation({
    mutationFn: putJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Jobs"] });
    },
  });
  return { jobQueries, deleteJobMutation, postJobMutation, putJobMutation };
};
