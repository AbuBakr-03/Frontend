// frontend/src/pages/dashboard/createInterview/Createinterview.tsx

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import { format } from "date-fns";
import { CalendarIcon, LinkIcon } from "lucide-react";
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
  FormMessage,
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
import { Input } from "../../../components/ui/input";
import Loader from "../../../components/loader/Loader";

const Createinterview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const { putInterviewMutation, postInterviewMutation } = useInterview();
  const { getQueryInterview } = useGetInterview(Number(id));
  const { data: interviewData, isLoading: isInterviewLoading } =
    getQueryInterview;
  const { applicationQueries } = useApplication();
  const { data: applicationsData, isLoading: isApplicationsLoading } =
    applicationQueries;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Define the schema
  const schema = z.object({
    application_id: z.string().min(1, "Please select an application"),
    date: z.date().nullable(),
    external_meeting_link: z
      .string()
      .url("Please enter a valid URL")
      .nullable()
      .optional(),
    interview_video: z
      .any()
      .refine(
        (files) => !files || !files.length || files[0] instanceof File,
        "Please upload a valid video file",
      )
      .nullable()
      .optional(),
  });

  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      application_id: "",
      date: null,
      external_meeting_link: null,
      interview_video: null,
    },
  });

  // Effect to populate form when editing
  useEffect(() => {
    if (interviewData) {
      form.reset({
        application_id: String(interviewData.application.id),
        date: interviewData.date ? new Date(interviewData.date) : null,
        external_meeting_link: interviewData.external_meeting_link || "",
      });
    }
  }, [interviewData, form]);

  // Only show applications with status "Approved for Interview" (status ID 2)
  const approvedApplications =
    applicationsData?.results.filter(
      (application) => application.status.id === 2,
    ) || [];

  const applicationOptions = approvedApplications.map((app) => (
    <SelectItem key={app.id} value={String(app.id)}>
      {app.name} - {app.job.title}
    </SelectItem>
  ));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("Selected file:", file.name, file.size, file.type);
      setSelectedFile(file);
      form.setValue("interview_video", e.target.files);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form data being submitted:", data);
    console.log("Selected file:", selectedFile);

    // For update (has ID)
    if (id) {
      putInterviewMutation.mutate(
        {
          id: Number(id),
          application_id: Number(data.application_id),
          date: data.date ? data.date.toISOString() : null,
          external_meeting_link: data.external_meeting_link || null,
          interview_video: selectedFile || null,
        },
        {
          onSuccess: () => {
            toast("Success!", {
              description: "Interview has been updated",
            });
            navigate("/dashboard/all-interview-sessions");
          },
          onError: (error) => {
            console.error("Error updating interview:", error);
            toast.error("Error!", {
              description: "Could not update interview. Please try again.",
            });
          },
        },
      );
    }
    // For create (no ID)
    else {
      postInterviewMutation.mutate(
        {
          application_id: Number(data.application_id),
          date: data.date ? data.date.toISOString() : null,
          external_meeting_link: data.external_meeting_link || null,
          interview_video: selectedFile || null,
        },
        {
          onSuccess: () => {
            toast("Success!", {
              description: "A new interview has been scheduled",
            });
            navigate("/dashboard/all-interview-sessions");
          },
          onError: (error) => {
            console.error("Error creating interview:", error);
            toast.error("Error!", {
              description: "Could not create interview. Please try again.",
            });
          },
        },
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
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4"
            encType="multipart/form-data"
          >
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
                  <FormMessage />
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
                            !field.value && "text-muted-foreground",
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="external_meeting_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meeting Link (Zoom/MS Teams)</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <LinkIcon className="h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="https://zoom.us/j/123456789"
                        {...field}
                        value={field.value || ""}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Add an external meeting link for the interview (Zoom, MS
                    Teams, etc)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interview_video"
              render={() => (
                <FormItem>
                  <FormLabel>Interview Recording</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <Input
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                        className="flex w-full items-center rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      />
                      {selectedFile && (
                        <p className="mt-1 text-sm text-gray-600">
                          Selected file: {selectedFile.name} (
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                        </p>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Upload a video recording of the interview for AI analysis
                  </FormDescription>
                  <FormMessage />
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
