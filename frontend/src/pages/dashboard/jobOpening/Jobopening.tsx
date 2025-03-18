import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import colors from "../../../styles/global.module.css";
import { DatePickerWithRange } from "../datepickerwithrange/DatePickerWithRange";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import { useState } from "react";
const Jobopening: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const schema = z.object({
    job: z.string().min(4),
    location: z.string().min(4),
    team: z.string().min(4),
    event: z.string().min(4),
    responsibilities: z.string().max(360),
    qualification: z.string().max(360),
    tohaves: z.string().max(360),
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
      description: "A new job opening has been created",
    });
  };
  return (
    <div className="grid place-items-center p-6">
      <div className="grid w-full gap-4 rounded-xl border p-6 lg:w-1/2">
        <h1 className="text-2xl font-bold">Create a Job Opening</h1>
        <form
          onSubmit={handleSubmit(submitter)}
          className="grid gap-4"
          action=""
        >
          <div className="grid gap-2">
            <label className="text-sm font-semibold" htmlFor="job">
              Job Name
            </label>
            <input
              {...register("job")}
              className="rounded-md border border-slate-300 py-2 pl-3 pr-6 text-sm"
              type="text"
              name="job"
              id="job"
            />
            {errors.job && (
              <p className="text-xs text-red-500">{errors.job.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-semibold" htmlFor="location">
              Location
            </label>
            <input
              {...register("location")}
              className="rounded-md border border-slate-300 py-2 pl-3 pr-6 text-sm"
              type="text"
              name="location"
              id="location"
            />
            {errors.location && (
              <p className="text-xs text-red-500">{errors.location.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-semibold" htmlFor="team">
              Team
            </label>
            <input
              {...register("team")}
              className="rounded-md border border-slate-300 py-2 pl-3 pr-6 text-sm"
              type="text"
              name="team"
              id="team"
            />
            {errors.team && (
              <p className="text-xs text-red-500">{errors.team.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-semibold" htmlFor="event">
              Event
            </label>
            <input
              {...register("event")}
              className="rounded-md border border-slate-300 py-2 pl-3 pr-6 text-sm"
              type="text"
              name="event"
              id="event"
            />
            {errors.event && (
              <p className="text-xs text-red-500">{errors.event.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <DatePickerWithRange></DatePickerWithRange>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold" htmlFor="responsibilities">
              Responsiblities
            </label>
            <textarea
              {...register("responsibilities")}
              className="rounded-md border border-slate-300 py-2 pl-3 pr-6 text-sm"
              name="responsibilities"
              id="responsibilities"
              cols={30}
              rows={6}
            ></textarea>
            {errors.responsibilities && (
              <p className="text-xs text-red-500">
                {errors.responsibilities.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-semibold" htmlFor="qualifications">
              Qualification
            </label>
            <textarea
              {...register("qualification")}
              className="rounded-md border border-slate-300 py-2 pl-3 pr-6 text-sm"
              name="qualification"
              id="qualification"
              cols={30}
              rows={6}
            ></textarea>
            {errors.qualification && (
              <p className="text-xs text-red-500">
                {errors.qualification.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-semibold" htmlFor="tohaves">
              Nice to Haves
            </label>
            <textarea
              {...register("tohaves")}
              className="rounded-md border border-slate-300 py-2 pl-3 pr-6 text-sm"
              name="tohaves"
              id="tohaves"
              cols={30}
              rows={6}
            ></textarea>
            {errors.tohaves && (
              <p className="text-xs text-red-500">{errors.tohaves.message}</p>
            )}
          </div>
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <button
                className={`${colors.background} rounded-md py-2 text-sm font-semibold text-white`}
              >
                Create Job
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Ready to Submit Your Application?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Please ensure all the information you provided is accurate.
                  Once submitted, you won’t be able to make changes.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    setOpen(false);
                    handleSubmit(submitter)();
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </form>
        <Toaster></Toaster>
      </div>
    </div>
  );
};
export default Jobopening;
