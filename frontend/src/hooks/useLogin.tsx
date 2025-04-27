import { useQueryClient, useMutation } from "@tanstack/react-query";
import { postLogin } from "../APIs/LoginApi";

const useLogin = () => {
  const queryClient = useQueryClient();
  const postLoginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("user_id", data.user.id.toString());
      localStorage.setItem("user_email", data.user.email);
      localStorage.setItem(
        "user_is_recruiter",
        data.user.is_recruiter.toString(),
      );
      localStorage.setItem("user_is_staff", data.user.is_staff.toString());
      localStorage.setItem(
        "user_is_superuser",
        data.user.is_superuser.toString(),
      );
      queryClient.invalidateQueries({ queryKey: ["Login"] });
    },
  });
  return { postLoginMutation };
};
export default useLogin;
