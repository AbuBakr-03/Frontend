import { Link } from "react-router-dom";
import colors from "../../styles/global.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const Signup: React.FC = () => {
  // const navigateTo = useNavigate();

  const schema = z.object({
    name: z.string().min(8, "Name must contain at least 8 letters"),
    email: z.string().email(),
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
  const submit: SubmitHandler<fieldTypes> = (data) => {
    console.log(data);
    toast("Success!", {
      description: "Your account has been successfully created!",
    });
    //navigateTo("/Login");
  };
  return (
    <main className={`grid h-screen w-full place-items-center`}>
      <div className={`grid w-full place-items-center`}>
        <form
          onSubmit={handleSubmit(submit)}
          className={`${colors.color} grid w-2/3 gap-4 rounded-xl border-2 border-slate-200 px-6 py-6 shadow lg:w-1/4`}
        >
          <div className={`grid gap-1`}>
            <h1 className={`justify-self-start text-2xl font-semibold`}>
              Signup
            </h1>
            <p className="text-sm text-slate-500">
              Enter your details below to create your account
            </p>
          </div>
          <div className="grid gap-2">
            <label className={`text-sm font-semibold`} htmlFor="name">
              Name
            </label>
            <input
              {...register("name")}
              className={`rounded-md border-2 border-slate-200 py-2 pl-2 pr-4 text-sm`}
              type="text"
              name="name"
              id="name"
              placeholder=""
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
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
            <p className={`text-xs text-slate-500`}>
              Use 8 characters or more.
            </p>
          </div>
          <button
            type="submit"
            className={`${colors.background} rounded-md px-6 py-2 text-sm font-semibold text-white`}
          >
            Signup
          </button>
          <button className="rounded-md border-2 border-slate-200 px-6 py-2 text-sm font-semibold">
            Signup with Google
          </button>
          <span className="text-center">
            <span className={`text-center text-sm`}>
              Already have an account? {""}
            </span>
            <Link
              className="text-sm underline underline-offset-4"
              to={"/Login"}
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
