import colors from "../../styles/global.module.css";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";

const Resetpassword: React.FC = () => {
  const schema = z.object({
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
    formState: { errors },
  } = useForm<fieldTypes>({ resolver: zodResolver(schema) });
  const submitter: SubmitHandler<fieldTypes> = (data) => {
    console.log(data);
    toast("Password Reset!", {
      description: "Your password has been changed.",
    });
  };
  return (
    <>
      <main className={`grid h-screen w-full place-items-center`}>
        <div className={`grid w-full place-items-center`}>
          <form
            onSubmit={handleSubmit(submitter)}
            className={`${colors.color} grid w-2/3 gap-4 rounded-xl border-2 border-slate-200 px-6 py-6 shadow lg:w-1/4`}
            action=""
          >
            <div className="grid grid-cols-2 items-center">
              <h1 className="justify-self-start text-xl font-semibold">
                Reset Password
              </h1>
              <Link
                className="justify-self-end text-sm underline-offset-2 hover:underline"
                to={"/log-in"}
              >
                Back to Login
              </Link>
            </div>
            <p className="text-sm text-slate-500">Enter your new password.</p>
            <div className="grid gap-2">
              <label className="text-sm font-semibold" htmlFor="password">
                New Password
              </label>
              <input
                {...register("password")}
                className="rounded-md border border-slate-300 py-2 pl-3 pr-6 text-sm"
                type="password"
                name="password"
                id="password"
              />
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              className={`${colors.background} rounded-md py-2 text-sm font-semibold text-white`}
            >
              Update Password
            </button>
          </form>
          <Toaster></Toaster>
        </div>
      </main>
    </>
  );
};
export default Resetpassword;
