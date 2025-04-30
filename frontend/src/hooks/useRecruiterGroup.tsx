import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getRecruiterGroupUsers,
  addUserToRecruiterGroup,
  removeUserFromRecruiterGroup,
} from "../APIs/RecruiterGroupApi";
import { useAuth } from "../contexts/AuthProvider";

const useRecruiterGroup = () => {
  const queryClient = useQueryClient();
  const { isAdmin, isRecruiter } = useAuth();

  const getRecruiterGroupQuery = useQuery({
    queryKey: ["RecruiterGroups"],
    queryFn: getRecruiterGroupUsers,
    enabled: isAdmin || isRecruiter,
  });
  const addRecruiterMutation = useMutation({
    mutationFn: addUserToRecruiterGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["RecruiterGroups"] });
    },
  });
  const removeRecruiterMutation = useMutation({
    mutationFn: removeUserFromRecruiterGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["RecruiterGroups"] });
    },
  });

  return {
    getRecruiterGroupQuery,
    addRecruiterMutation,
    removeRecruiterMutation,
  };
};
export default useRecruiterGroup;
