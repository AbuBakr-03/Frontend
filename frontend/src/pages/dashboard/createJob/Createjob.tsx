import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Calendar } from "../../../components/ui/calendar";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../../../components/ui/alert-dialog";
import { useEffect, useState } from "react";
import colors from "../../../styles/global.module.css";
import useDepartment from "../../../hooks/useDepartment";
import useCompany from "../../../hooks/useCompany";
import { useJob } from "../../../hooks/useJob";
import { useNavigate, useParams } from "react-router-dom";
import useGetJob from "../../../hooks/useGetJob";
const Createjob = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { postJobMutation, putJobMutation } = useJob();
  const { getQueryJob } = useGetJob(Number(id));
  const { data: jobData } = getQueryJob;
  const { companyQueries } = useCompany();
  const { departmentQueries } = useDepartment();
  const { data: companyData } = companyQueries;
  const { data: departmentData } = departmentQueries;
  const schema = z.object({
    title: z.string().min(4),
    location: z.string().min(4),
    company_id: z.string(),
    department_id: z.string(),
    end_date: z.date({
      required_error: "A date of birth is required.",
    }),
    responsiblities: z.string().min(12).max(360),
    qualification: z.string().min(12).max(360),
    nice_to_haves: z.string().min(12).max(360),
    recruiter: z.number(),
  });
  type fieldTypes = z.infer<typeof schema>;
  const form = useForm<fieldTypes>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      location: "",
      company_id: "",
      department_id: "",
      responsiblities: "",
      qualification: "",
      nice_to_haves: "",
      recruiter: 2,
    },
  });
  const companyOptions = companyData?.results.map((x) => {
    return (
      <SelectItem key={x.id} value={String(x.id)}>
        {x.name}
      </SelectItem>
    );
  });
  const departmentOptions = departmentData?.results.map((x) => {
    return (
      <SelectItem key={x.id} value={String(x.id)}>
        {x.title}
      </SelectItem>
    );
  });
  useEffect(() => {
    if (jobData) {
      form.reset({
        title: jobData.title,
        location: jobData.location,
        company_id: String(jobData.company.id),
        department_id: String(jobData.department.id),
        end_date: jobData.end_date,
        qualification: jobData.qualification,
        responsiblities: jobData.responsiblities,
        nice_to_haves: jobData.nice_to_haves,
        recruiter: 2,
      });
    }
  }, [jobData, form]);
  const submitter: SubmitHandler<fieldTypes> = (data) => {
    console.log("hi");
    console.log(data);
    if (id) {
      putJobMutation.mutate(
        {
          ...data,
          id: Number(id),
          department_id: Number(data.department_id),
          company_id: Number(data.company_id),
          recruiter: 2,
        },
        {
          onSuccess: () => {
            console.log(data);
            toast("Success!", {
              description: "Job opening has been updated",
            });
            navigate("/dashboard/all-jobs");
          },
          onError: () => {
            console.log(data);
          },
        },
      );
    } else {
      console.log(data);
      postJobMutation.mutate(
        {
          ...data,
          department_id: Number(data.department_id),
          company_id: Number(data.company_id),
          recruiter: 2,
        },
        {
          onSuccess: () => {
            console.log(data);
            toast("Success!", {
              description: "A new job opening has been created",
            });
            navigate("/dashboard/all-jobs");
          },
          onError: () => {
            console.log(data);
          },
        },
      );
    }
  };
  return (
    <Form {...form}>
      <div className="grid place-items-center p-6">
        <div className="grid w-full gap-4 rounded-xl border p-6 lg:w-1/2">
          {id ? (
            <h1 className="text-2xl font-bold">Update a Job Opening</h1>
          ) : (
            <h1 className="text-2xl font-bold">Create a Job Opening</h1>
          )}
          <form
            onSubmit={form.handleSubmit(submitter, (errors) => {
              console.log(errors);
            })}
            className="grid gap-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a company" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>{companyOptions}</SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="department_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>{departmentOptions}</SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="center">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="responsiblities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Responsiblities</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder=""
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="qualification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qualifications</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder=""
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nice_to_haves"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nice to Haves</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder=""
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <button
                  type="button"
                  className={`${colors.background} rounded-md py-2 text-sm font-semibold text-white`}
                >
                  {id ? "Update Job" : "Create Job"}
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {id ? "Update job?" : "Create Job?"}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Please ensure all the information you provided is accurate.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      console.log("hi");
                      setOpen(false);
                      console.log("hello");
                      form.handleSubmit(submitter)();
                      console.log("hi again");
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </form>
        </div>
      </div>
    </Form>
  );
};
export default Createjob;
