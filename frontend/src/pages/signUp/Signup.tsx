import { Link, useNavigate } from "react-router-dom";
import colors from "../../styles/global.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useSignup from "../../hooks/useSignup";
const Signup: React.FC = () => {
  const { postSignupMutation } = useSignup();
  const navigate = useNavigate();
  const schema = z.object({
    username: z
      .string()
      .min(4, { message: "Username must be at least 4 characters long" })
      .max(20, { message: "Username must be at most 20 characters long" })
      .regex(
        /^[a-zA-Z0-9._]+$/,
        "Username can only contain letters, numbers, dots, and underscores",
      ),
    email: z
      .string()
      .email({ message: "Invalid email format" })
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email must be a valid email address",
      ),
    password: z
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        "Password must include uppercase, lowercase, number & symbol",
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
    postSignupMutation.mutate(data, {
      onSuccess: () => {
        console.log(data);
        toast("Account created 🎉", {
          description: "Welcome aboard! You can now log in and get started.",
        });
        reset();
        navigate("/log-in");
      },
      onError: (error) => {
        console.error(error);
        toast("Something went wrong 😓", {
          description: "Please check your details and try again.",
        });
      },
    });

    //navigateTo("/Login");
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
              Signup
            </h1>
            <p className="text-sm text-slate-500">
              Create your account by filling in the details below.{" "}
            </p>
          </div>
          <div className="grid gap-2">
            <label className={`text-sm font-semibold`} htmlFor="username">
              Username
            </label>
            <input
              {...register("username")}
              className={`rounded-md border-2 border-slate-200 py-2 pl-2 pr-4 text-sm`}
              type="text"
              name="username"
              id="username"
              placeholder=""
            />
            {errors.username && (
              <p className="text-xs text-red-500">{errors.username.message}</p>
            )}
            <p className="text-xs text-slate-500">
              4–20 characters. Use letters, numbers, dots or underscores.
            </p>
          </div>
          <div className="grid gap-2">
            <label className={`text-sm font-semibold`} htmlFor="email">
              Email
            </label>
            <input
              {...register("email")}
              className={`rounded-md border-2 border-slate-200 py-2 pl-2 pr-4 text-sm`}
              type="email"
              name="email"
              id="email"
              placeholder="m@example.com"
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
            <p className="text-xs text-slate-500">
              Enter a valid email like you@example.com
            </p>
          </div>
          <div className="grid gap-2">
            <label className={`text-sm font-semibold`} htmlFor="password">
              Password
            </label>
            <input
              {...register("password")}
              className={`rounded-md border-2 border-slate-200 py-2 pl-3 pr-4 text-sm`}
              type="password"
              name="password"
              id="password"
              placeholder=""
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
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
            Signup
          </button>
          {/* <button className="rounded-md border-2 border-slate-200 px-6 py-2 text-sm font-semibold">
            Signup with Google
          </button> */}
          <span className="text-center">
            <span className={`text-center text-sm`}>
              Already have an account? {""}
            </span>
            <Link
              className="text-sm underline underline-offset-4"
              to={"/log-in"}
            >
              Login
            </Link>
          </span>
        </form>
        <Toaster></Toaster>
      </div>
    </main>
  );
};
export default Signup;
