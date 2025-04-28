// frontend/src/pages/dashboard/allInterviews/Allinterviews.tsx

import { columns, interviewType } from "./Columns";
import { DataTable } from "../../../components/table/Datatable";
import { toast, Toaster } from "sonner";
import { useInterview } from "../../../hooks/useInterview";
import Loader from "../../../components/loader/Loader";

const Allinterviews = () => {
  const {
    interviewQueries,
    deleteInterviewMutation,
    analyzeRecordingMutation,
  } = useInterview();
  const { data, isLoading } = interviewQueries;

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const handleDelete = (id: number) => {
    deleteInterviewMutation.mutate(id, {
      onSuccess: () => {
        interviewQueries.refetch();
        toast("Deleted!", {
          description: "Interview has been deleted successfully!",
        });
      },
    });
  };

  const handleAnalyze = (id: number) => {
    toast.info("Analysis started...", {
      description: "This may take a moment.",
    });

    analyzeRecordingMutation.mutate(id, {
      onSuccess: (data) => {
        interviewQueries.refetch();
        toast("Analysis Complete!", {
          description: `Result: ${data.result_title} (Confidence: ${data.confidence.toFixed(1)}%)`,
        });
      },
      onError: () => {
        toast.error("Error!", {
          description: "Could not analyze interview video. Please try again.",
        });
      },
    });
  };

  const newcolumns = columns(handleDelete, handleAnalyze);

  // Transform API data to match the table columns and ensure type compatibility
  const transformedData: interviewType[] = data.results.map((interview) => ({
    id: interview.id,
    application_name: interview.application.name,
    application_job: interview.application.job.title,
    application_email: interview.application.email,
    date: interview.date,
    result: interview.result.title,
    external_meeting_link: interview.external_meeting_link,
    interview_video: interview.interview_video, // This is a string (URL) from the API
    analysis_data: interview.analysis_data,
  }));

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={newcolumns}
        filter="application_name"
        data={transformedData}
      />
      <Toaster></Toaster>
    </div>
  );
};

export default Allinterviews;
