import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import colors from "../../../styles/global.module.css";
const Personalinformation: React.FC = () => {
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
  const submitter: SubmitHandler<fieldTypes> = (data) => {
    console.log(data);
    toast("Success!", {
      description: "Your personal information has been updated",
    });
  };
  return (
    <div className="grid place-items-center p-6">
      <div className="grid w-full gap-4 rounded-xl border p-6 lg:w-1/2">
        <h1 className="text-2xl font-bold">Personal Informarion</h1>
        <form
          onSubmit={handleSubmit(submitter)}
          className="grid gap-4"
          action=""
        >
          <div className="grid gap-2">
            <label className="text-sm font-semibold" htmlFor="name">
              Name
            </label>
            <input
              {...register("name")}
              className="rounded-md border border-slate-300 py-2 pl-3 pr-6 text-sm"
              type="text"
              name="name"
              id="name"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
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
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold" htmlFor="password">
              Password
            </label>
            <input
              {...register("password")}
              className="rounded-md border border-slate-300 py-2 pl-3 pr-6 text-sm"
              type="text"
              name="password"
              id="password"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <button
            className={`${colors.background} rounded-md py-2 text-sm font-semibold text-white`}
          >
            Save
          </button>
        </form>
        <Toaster></Toaster>
      </div>
    </div>
  );
};
export default Personalinformation;
