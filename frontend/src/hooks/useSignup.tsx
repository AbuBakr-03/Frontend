import { useQueryClient, useMutation } from "@tanstack/react-query";
import { postSignup } from "../APIs/SignupApi";

const useSignup = () => {
  const queryClient = useQueryClient();
  const postSignupMutation = useMutation({
    mutationFn: postSignup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Signup"] });
    },
  });
  return { postSignupMutation };
};
export default useSignup;
