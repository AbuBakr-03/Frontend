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
import { useEffect, useState } from "react";
import useDepartment from "../../../hooks/useDepartment";
import { useNavigate, useParams } from "react-router-dom";
import useGetDepartment from "../../../hooks/useGetDepartment";
const Createdepartment: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { postDepartmentMutation, putDepartmentMutation } = useDepartment();
  const { getQueryDept } = useGetDepartment(Number(id));
  const { data } = getQueryDept;
  const [open, setOpen] = useState<boolean>(false);
  const schema = z.object({
    title: z.string().min(4),
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
        title: data.title,
        slug: data.slug,
      });
    }
  }, [data, reset]);
  const submitter: SubmitHandler<fieldTypes> = (data) => {
    if (id) {
      putDepartmentMutation.mutate(
        { ...data, id: Number(id) },
        {
          onSuccess: () => {
            toast("Success!", {
              description: "Department has been updated",
            });
            navigate("/dashboard/all-departments");
          },
        },
      );
    } else {
      postDepartmentMutation.mutate(data, {
        onSuccess: () => {
          toast("Success!", {
            description: "A new department has been created",
          });
          navigate("/dashboard/all-departments");
        },
      });

      console.log(data);
    }
  };
  return (
    <div className="grid place-items-center p-6">
      <div className="grid w-full gap-4 rounded-xl border p-6 lg:w-1/2">
        {id ? (
          <h1 className="text-2xl font-bold">Update a Department</h1>
        ) : (
          <h1 className="text-2xl font-bold">Create a Department</h1>
        )}
        <form
          onSubmit={handleSubmit(submitter)}
          className="grid gap-4"
          action=""
        >
          <div className="grid gap-2">
            <label className="text-sm font-semibold" htmlFor="title">
              Department Name
            </label>
            <input
              {...register("title")}
              className="rounded-md border border-slate-300 py-2 pl-3 pr-6 text-sm"
              type="text"
              name="title"
              id="title"
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title.message}</p>
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
                  Update Department
                </button>
              ) : (
                <button
                  className={`${colors.background} rounded-md py-2 text-sm font-semibold text-white`}
                >
                  Create Department
                </button>
              )}
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                {id ? (
                  <AlertDialogTitle>Update Department?</AlertDialogTitle>
                ) : (
                  <AlertDialogTitle>Create Department?</AlertDialogTitle>
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
export default Createdepartment;
