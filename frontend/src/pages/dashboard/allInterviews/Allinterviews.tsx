import { columns } from "./Columns";
import { DataTable } from "../../../components/table/Datatable";
import { toast, Toaster } from "sonner";
import { useInterview } from "../../../hooks/useInterview";
import Loader from "../../../components/loader/Loader";

const Allinterviews = () => {
  const {
    interviewQueries,
    deleteInterviewMutation,
    generateMeetingLinkMutation,
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

  const handleGenerateLink = (id: number) => {
    generateMeetingLinkMutation.mutate(id, {
      onSuccess: (data) => {
        interviewQueries.refetch();
        toast("Link Generated!", {
          description: "Video conference link has been created successfully.",
        });
      },
      onError: () => {
        toast.error("Error!", {
          description: "Could not generate meeting link. Please try again.",
        });
      },
    });
  };

  const newcolumns = columns(handleDelete, handleGenerateLink);

  // Transform API data to match the table columns
  const transformedData = data.results.map((interview) => ({
    id: interview.id,
    application_name: interview.application.name,
    application_job: interview.application.job.title,
    application_email: interview.application.email,
    date: interview.date,
    result: interview.result.title,
    meeting_link: interview.meeting_link,
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
