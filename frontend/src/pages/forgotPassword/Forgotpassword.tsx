import colors from "../../styles/global.module.css";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
const Forgotpassword: React.FC = () => {
  const schema = z.object({
    email: z.string().email(),
  });
  type fieldTypes = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<fieldTypes>({ resolver: zodResolver(schema) });
  const submitter: SubmitHandler<fieldTypes> = (data) => {
    console.log(data);
    toast("Instructions Sent!", {
      description: "Reset instructions sent, please check your Email.",
    });
  };
  return (
    <main className={`grid h-screen w-full place-items-center`}>
      <div className={`grid w-full place-items-center`}>
        <form
          onSubmit={handleSubmit(submitter)}
          className={`${colors.color} grid w-2/3 gap-4 rounded-xl border-2 border-slate-200 px-6 py-6 shadow lg:w-1/4`}
          action=""
        >
          <div className="grid grid-cols-2 items-center">
            <h1 className="justify-self-start text-xl font-semibold">
              Forgot Password
            </h1>
            <Link
              className="justify-self-end text-sm underline-offset-2 hover:underline"
              to={"/Login"}
            >
              Back to Login
            </Link>
          </div>
          <p className="text-sm text-slate-500">
            Enter your email, and we’ll send you instructions on how to reset
            your password
          </p>
          <div className="grid gap-2">
            <label className="text-sm font-semibold" htmlFor="email">
              Email
            </label>
            <input
              {...register("email")}
              className="rounded-md border border-slate-300 py-2 pl-3 pr-6 text-sm"
              type="email"
              name="email"
              id="email"
              placeholder="m@example.com"
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>
          <button
            className={`${colors.background} rounded-md py-2 text-sm font-semibold text-white`}
          >
            Send me reset instructions
          </button>
        </form>
        <Toaster></Toaster>
      </div>
    </main>
  );
};

export default Forgotpassword;
