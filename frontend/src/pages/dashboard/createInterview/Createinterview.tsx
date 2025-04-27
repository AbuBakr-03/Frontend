import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "../../../lib/utils";
import colors from "../../../styles/global.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useInterview } from "../../../hooks/useInterview";
import useGetInterview from "../../../hooks/useGetInterview";
import { useApplication } from "../../../hooks/useApplication";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from "../../../components/ui/form";
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
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import { Button } from "../../../components/ui/button";
import { Calendar } from "../../../components/ui/calendar";
import Loader from "../../../components/loader/Loader";
import { Checkbox } from "../../../components/ui/checkbox";

const Createinterview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const { putInterviewMutation, postInterviewMutation } = useInterview();
  const { getQueryInterview } = useGetInterview(Number(id));
  const { data: interviewData, isLoading: isInterviewLoading } = getQueryInterview;
  const { applicationQueries } = useApplication();
  const { data: applicationsData, isLoading: isApplicationsLoading } = applicationQueries;

  // Define the schema
  const schema = z.object({
    application_id: z.string().min(1, "Please select an application"),
    date: z.date().nullable(),
    generate_link: z.boolean().default(false),
  });

  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      application_id: "",
      date: null,
      generate_link: false,
    },
  });

  // Effect to populate form when editing
  useEffect(() => {
    if (interviewData) {
      form.reset({
        application_id: String(interviewData.application.id),
        date: interviewData.date ? new Date(interviewData.date) : null,
        generate_link: !!interviewData.meeting_link,
      });
    }
  }, [interviewData, form]);

  // Only show applications with status "Approved for Interview" (status ID 2)
  const approvedApplications = applicationsData?.results.filter(
    (application) => application.status.id === 2
  ) || [];

  const applicationOptions = approvedApplications.map((app) => (
    <SelectItem key={app.id} value={String(app.id)}>
      {app.name} - {app.job.title}
    </SelectItem>
  ));

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // For update (has ID)
    if (id) {
      putInterviewMutation.mutate(
        {
          id: Number(id),
          application_id: Number(data.application_id),
          date: data.date ? data.date.toISOString() : null,
          generate_link: data.generate_link,
        },
        {
          onSuccess: () => {
            toast("Success!", {
              description: "Interview has been updated",
            });
            navigate("/dashboard/all-interview-sessions");
          },
        }
      );
    } 
    // For create (no ID)
    else {
      postInterviewMutation.mutate(
        {
          application_id: Number(data.application_id),
          date: data.date ? data.date.toISOString() : null,
          generate_link: data.generate_link,
        },
        {
          onSuccess: () => {
            toast("Success!", {
              description: "A new interview has been scheduled",
            });
            navigate("/dashboard/all-interview-sessions");
          },
        }
      );
    }
  };

  if (isInterviewLoading && id) {
    return <Loader />;
  }

  if (isApplicationsLoading) {
    return <Loader />;
  }

  return (
    <Form {...form}>
      <div className="grid place-items-center p-6">
        <div className="grid w-full gap-4 rounded-xl border p-6 lg:w-1/2">
          {id ? (
            <h1 className="text-2xl font-bold">Update Interview</h1>
          ) : (
            <h1 className="text-2xl font-bold">Schedule Interview</h1>
          )}
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="application_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!!id} // Disable changing application when editing
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an application" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>{applicationOptions}</SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Interview Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP HH:mm")
                          ) : (
                            <span>Pick a date and time</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="center">
                      <Calendar
                        mode="single"
                        selected={field.value || undefined}
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
              name="generate_link"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Generate Video Conference Link
                    </FormLabel>
                    <FormDescription>
                      Create a video conference link for this interview that both recruiter and candidate can use.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <button
                  type="button"
                  className={`${colors.background} rounded-md py-2 text-sm font-semibold text-white`}
                >
                  {id ? "Update Interview" : "Schedule Interview"}
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {id ? "Update this interview?" : "Schedule this interview?"}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Please confirm all the interview details are correct.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      setOpen(false);
                      form.handleSubmit(onSubmit)();
                    }}
                  >
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </form>
        </div>
      </div>
      <Toaster />
    </Form>
  );
};

export default Createinterview;