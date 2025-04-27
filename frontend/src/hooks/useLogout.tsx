import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLogout } from "../APIs/LogoutApi";

const useLogout = () => {
  const queryClient = useQueryClient();
  const postLogoutQuery = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Logout"] });
    },
  });
  return { postLogoutQuery };
};
export default useLogout;
