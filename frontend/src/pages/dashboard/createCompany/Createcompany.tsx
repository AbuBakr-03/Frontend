import colors from "../../../styles/global.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
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

import useCompany from "../../../hooks/useCompany";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
const Createcompany: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { useGetQuery, postCompanyMutation, putCompanyMutation } = useCompany();
  const { getQuery } = useGetQuery(Number(id));
  const { data } = getQuery;
  const [open, setOpen] = useState<boolean>(false);
  const schema = z.object({
    name: z.string().min(4),
    slug: z.string().min(4).toLowerCase(),
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
    if (data) {
      reset({
        name: data.name,
        slug: data.slug,
      });
    }
  }, [data, reset]);
  const submitter: SubmitHandler<fieldTypes> = (data) => {
    if (id) {
      putCompanyMutation.mutate(
        { ...data, id: Number(id) },
        {
          onSuccess: () => {
            toast("Success!", {
              description: "Company info updated successfully!",
            });
          },
        },
      );
    } else {
      postCompanyMutation.mutate(data, {
        onSuccess: () => {
          toast("Success!", {
            description: "A new company has been created",
          });
          navigate("/dashboard/all-companies");
        },
      });
    }
    console.log(data);
  };
  return (
    <div className="grid place-items-center p-6">
      <div className="grid w-full gap-4 rounded-xl border p-6 lg:w-1/2">
        {id ? (
          <h1 className="text-2xl font-bold">Update a Company</h1>
        ) : (
          <h1 className="text-2xl font-bold">Create a Company</h1>
        )}
        <form
          onSubmit={handleSubmit(submitter)}
          className="grid gap-4"
          action=""
        >
          <div className="grid gap-2">
            <label className="text-sm font-semibold" htmlFor="name">
              Company Name
            </label>
            <input
              {...register("name")}
              className="rounded-md border border-slate-300 py-2 pl-3 pr-6 text-sm"
              type="text"
              name="name"
              id="name"
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-semibold" htmlFor="slug">
              Slug
            </label>
            <input
              {...register("slug")}
              className="rounded-md border border-slate-300 py-2 pl-3 pr-6 text-sm"
              type="text"
              name="slug"
              id="slug"
            />
            {errors.slug && (
              <p className="text-xs text-red-500">{errors.slug.message}</p>
            )}
          </div>

          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              {id ? (
                <button
                  className={`${colors.background} rounded-md py-2 text-sm font-semibold text-white`}
                >
                  Update Company
                </button>
              ) : (
                <button
                  className={`${colors.background} rounded-md py-2 text-sm font-semibold text-white`}
                >
                  Create Company
                </button>
              )}
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                {id ? (
                  <AlertDialogTitle>Update Company?</AlertDialogTitle>
                ) : (
                  <AlertDialogTitle>Create Company?</AlertDialogTitle>
                )}
                <AlertDialogDescription>
                  Please ensure all the information you provided is accurate.
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
export default Createcompany;
