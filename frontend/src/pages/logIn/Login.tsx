import { Link, useNavigate } from "react-router-dom";
import colors from "../../styles/global.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAuth } from "../../contexts/AuthProvider";
import useLogin from "../../hooks/useLogin";
const Login: React.FC = () => {
  const navigateTo = useNavigate();
  const { postLoginMutation } = useLogin();
  const { setAuth } = useAuth();
  const schema = z.object({
    username: z
      .string()
      .min(4, { message: "Username must be at least 4 characters long" })
      .max(20, { message: "Username must be at most 20 characters long" })
      .regex(
        /^[a-zA-Z0-9._]+$/,
        "Username can only contain letters, numbers, dots, and underscores",
      ),
    password: z
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        "Must include uppercase, lowercase, number & symbol",
      ),
  });
  type fieldTypes = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<fieldTypes>({ resolver: zodResolver(schema) });
  const submit: SubmitHandler<fieldTypes> = (data) => {
    postLoginMutation.mutate(data, {
      onSuccess: (response) => {
        // Store tokens in context and localStorage
        setAuth({
          access: response.access,
          refresh: response.refresh,
          user: response.user,
        });

        // Show success message
        console.log(response.user);
        toast("Welcome back 🎉", {
          description: "You’re now logged in and ready to explore.",
        });
        reset();
        navigateTo("/");
      },
      onError: (error) => {
        // Handle error
        console.error("Login failed", error);
        toast("Oops, something went wrong 😓", {
          description: "Please check your username/password and try again.",
        });
      },
    });
  };
  return (
    <main className={`grid h-screen w-full place-items-center`}>
      <div className={`grid w-full place-items-center`}>
        <form
          onSubmit={handleSubmit(submit)}
          className={`${colors.color} grid w-2/3 gap-4 rounded-xl border-2 border-slate-200 px-6 py-6 shadow lg:w-4/12`}
        >
          <div className={`grid gap-1`}>
            <h1 className={`justify-self-start text-2xl font-semibold`}>
              Login
            </h1>
            <p className="text-sm text-slate-500">
              Welcome back! Please enter your credentials to log in.{" "}
            </p>
          </div>

          <div className="grid gap-2">
            <label className={`text-sm font-semibold`} htmlFor="username">
              Username
            </label>
            <input
              {...register("username")}
              className={`rounded-md border-2 border-slate-200 py-2 pl-3 pr-4 text-sm`}
              type="text"
              name="username"
              id="username"
              placeholder=""
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
            <p className="text-xs text-slate-500">
              4–20 characters. Use letters, numbers, dots or underscores.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-2">
              <label className={`text-sm font-semibold`} htmlFor="password">
                Password
              </label>
              <Link
                to={"/forgot-password"}
                className="justify-self-end text-sm underline-offset-2 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>

            <input
              {...register("password")}
              className={`rounded-md border-2 border-slate-200 py-2 pl-3 pr-4 text-sm`}
              type="password"
              name="password"
              id="password"
              placeholder=""
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
            <p className="text-xs text-slate-500">
              At least 8 characters. Must include uppercase, lowercase, number &
              symbol.
            </p>
          </div>
          <button
            type="submit"
            className={`${colors.background} rounded-md px-6 py-2 text-sm font-semibold text-white`}
          >
            Login
          </button>

          {/* <button className="rounded-md border-2 border-slate-200 px-6 py-2 text-sm font-semibold">
            Login with Google
          </button> */}
          <span className="text-center">
            <span className={`text-center text-sm`}>
              Don't have an account? {""}
            </span>
            <Link
              to={"/sign-up"}
              className={`text-center text-sm underline underline-offset-4`}
            >
              Sign up
            </Link>
          </span>
        </form>
      </div>
    </main>
  );
};
export default Login;
