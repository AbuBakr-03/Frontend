import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getRecruiterRequests,
  postRecruiterRequest,
  deleteRecruiterRequest,
} from "../APIs/RecruiterApi";
import { useAuth } from "../contexts/AuthProvider";

const useRecruiters = () => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();
  const getRecruitersQuery = useQuery({
    queryKey: ["Recruiters"],
    queryFn: getRecruiterRequests,
    enabled: !!auth.user?.is_superuser,
  });
  const postRecruiterQuery = useMutation({
    mutationFn: postRecruiterRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Recruiters"] });
    },
  });
  const deleteRecruiterQuery = useMutation({
    mutationFn: deleteRecruiterRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Recruiters"] });
    },
  });

  return { getRecruitersQuery, postRecruiterQuery, deleteRecruiterQuery };
};
export default useRecruiters;
