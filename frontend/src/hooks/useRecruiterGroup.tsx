import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getRecruiterGroupUsers,
  addUserToRecruiterGroup,
  removeUserFromRecruiterGroup,
} from "../APIs/RecruiterGroupApi";

const useRecruiterGroup = () => {
  const queryClient = useQueryClient();
  const getRecruiterGroupQuery = useQuery({
    queryKey: ["RecruiterGroups"],
    queryFn: getRecruiterGroupUsers,
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
