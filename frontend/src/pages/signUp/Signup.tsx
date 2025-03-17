import { Link } from "react-router-dom";
import { Github } from "lucide-react";
import colors from "../../styles/global.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
const Signup: React.FC = () => {
  type fieldTypes = {
    name: string;
    email: string;
    password: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<fieldTypes>();
  const submit: SubmitHandler<fieldTypes> = (data) => {
    console.log(data);
  };
  return (
    <main className={`grid h-screen w-full place-items-center`}>
      <div className={`grid w-full place-items-center`}>
        <form
          onSubmit={handleSubmit(submit)}
          className={`${colors.color} grid w-2/3 gap-4 rounded-md border-2 border-slate-200 px-6 py-4 shadow lg:w-1/3`}
        >
          <div className={`grid grid-cols-2 place-items-center`}>
            <h1 className={`justify-self-start text-2xl font-semibold`}>
              Sign Up
            </h1>
            <Link to={"/Login"}>
              <p className={`justify-self-end text-sm hover:underline`}>
                I have an account
              </p>
            </Link>
          </div>
          <div className="grid gap-2">
            <label className={`font-semibold`} htmlFor="name">
              Name
            </label>
            <input
              {...register("name")}
              className={`rounded-md border-2 border-slate-200 py-1 pl-2 pr-4`}
              type="text"
              name="name"
              id="name"
              placeholder="Name"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <label className={`font-semibold`} htmlFor="email">
              Email
            </label>
            <input
              {...register("email")}
              className={`rounded-md border-2 border-slate-200 py-1 pl-2 pr-4`}
              type="email"
              name="email"
              id="email"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <label className={`font-semibold`} htmlFor="password">
              Password
            </label>
            <input
              {...register("password")}
              className={`rounded-md border-2 border-slate-200 py-1 pl-2 pr-4`}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <p className={`text-xs text-slate-400`}>
              Use 8 characters or more.
            </p>
          </div>
          <hr />
          <button
            type="submit"
            className={`${colors.background} rounded-md px-6 py-2 text-white`}
          >
            Agree and Sign Up
          </button>
          <button className="grid place-items-center gap-2 rounded-md border-2 border-slate-200 px-6 py-2">
            <div className="grid grid-cols-2 place-items-center">
              <Github />
              <span>Github</span>
            </div>
          </button>
          <p
            className={`grid w-10/12 place-self-center text-center text-sm font-semibold`}
          >
            By signing up, you agree to the Terms and Conditions and Privacy
            Policy
          </p>
        </form>
      </div>
    </main>
  );
};
export default Signup;
