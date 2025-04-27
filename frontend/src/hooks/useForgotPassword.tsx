import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postEmail } from "../APIs/ForgotpasswordApi";

export const useForgotPassword = () => {
  const queryClient = useQueryClient();
  const postEmailMutation = useMutation({
    mutationFn: postEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Email"] });
    },
  });
  return { postEmailMutation };
};
