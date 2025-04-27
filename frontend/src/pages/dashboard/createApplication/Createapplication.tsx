// import { Label } from "../../components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";

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
import { useEffect, useState } from "react";
import { useApplication } from "../../../hooks/useApplication";
import { useParams } from "react-router-dom";
import useGetApplication from "../../../hooks/useGetApplication";
const Createapplication: React.FC = () => {
  const { putApplicationMutation } = useApplication();
  const { id } = useParams();
  const { getQueryApplication } = useGetApplication(Number(id));
  const { data: applicationData } = getQueryApplication;
  const schema = z.object({
    name: z
      .string()
      .min(8, { message: "Name must be at least 8 characters long." })
      .max(50, { message: "Name must be at most 50 characters long." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    residence: z
      .string()
      .min(8, { message: "Residence must be at least 8 characters long." })
      .max(100, { message: "Residence must be at most 100 characters long." }),
    cover_letter: z
      .string()
      .min(20, { message: "Cover letter must be at least 20 characters long." })
      .max(1000, {
        message: "Cover letter must be at most 1000 characters long.",
      }),
    // file: z
    //   .any()
    //   .refine((files) => files?.[0], { message: "Resume file is required." })
    //   .refine((files) => files?.[0]?.type === "application/pdf", {
    //     message: "Only PDF files are accepted.",
    //   })
    //   .refine((files) => files?.[0]?.size <= 5 * 1024 * 1024, {
    //     message: "Resume file must be smaller than 5MB.",
    //   }),
  });

  type fieldTypes = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<fieldTypes>({
    resolver: zodResolver(schema),
  });
  useEffect(() => {
    if (applicationData) {
      reset({
        name: applicationData.name,
        email: applicationData.email,
        residence: applicationData.residence,
        cover_letter: applicationData.cover_letter,
      });
    }
  }, [applicationData, reset]);
  const [open, setOpen] = useState<boolean>(false);
  const submitter: SubmitHandler<fieldTypes> = (data) => {
    if (applicationData?.job.id) {
      console.log(data);
      putApplicationMutation.mutate(
        { ...data, id: Number(id), job_id: applicationData?.job.id },
        {
          onSuccess: () => {
            console.log(data);
            toast("Application Submitted", {
              description: "Your application has been successfully submitted.",
            });
          },
        },
      );
    }
  };
  const handlechange = () => {
    setOpen(false);
  };
  return (
    <div className="grid place-items-center p-6">
      <div
        className={
          "lg:w-1/2grid grid w-full gap-4 rounded-xl border p-6 lg:w-1/2"
        }
      >
        <h1 className="text-2xl font-bold">Update an Application</h1>

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
              className="rounded-md border border-slate-300 py-2 pl-3 pr-6"
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
              className="rounded-md border border-slate-300 py-2 pl-3 pr-6"
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
            <label className="text-sm font-semibold" htmlFor="residence">
              Place of Residence
            </label>
            <input
              {...register("residence")}
              className="rounded-md border border-slate-300 py-2 pl-3 pr-6"
              type="text"
              name="residence"
              id="residence"
            />
            {errors.residence && (
              <p className="text-sm text-red-500">{errors.residence.message}</p>
            )}
          </div>
          {/* <div className="grid gap-2">
                <Label htmlFor="file">Resume/CV</Label>
                <input
                  {...register("file")}
                  className="flex w-full items-center rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  id="file"
                  type="file"
                ></input>
                <p className="text-xs text-slate-500">
                  Accepted formats: PDF, DOC, DOCX. Max size: 5MB
                </p>
                {errors.file && (
                  <p className="text-sm text-red-500">
                    {errors.file.message?.toString()}
                  </p>
                )}
              </div> */}
          <div className="grid gap-2">
            <label className="text-sm font-semibold" htmlFor="cover_letter">
              Cover Letter
            </label>
            <textarea
              {...register("cover_letter")}
              className="rounded-md border border-slate-300 py-1 pl-3 pr-6 text-sm"
              name="cover_letter"
              id="cover_letter"
              cols={30}
              rows={5}
              placeholder="Tell us why you're interested in this position and why you'd be a great fit."
              maxLength={280}
            ></textarea>
            {errors.cover_letter && (
              <p className="text-sm text-red-500">
                {errors.cover_letter.message}
              </p>
            )}
          </div>

          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <button className="rounded-md bg-black py-2 text-sm font-medium text-white">
                Update
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Ready to Update the Application?
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
                    handlechange();
                    handleSubmit(submitter)();

                    //reason for extra () is because arrow function is not executing it immediatly, handlesubmit returns a function so to execute it immediatly we add ()
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
export default Createapplication;
