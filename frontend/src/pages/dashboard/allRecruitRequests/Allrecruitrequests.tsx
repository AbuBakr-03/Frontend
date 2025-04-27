import { columns } from "./Columns";
import { DataTable } from "../../../components/table/Datatable";
import { toast, Toaster } from "sonner";
import useRecruiters from "../../../hooks/useRecruiters";
import useRecruiterGroup from "../../../hooks/useRecruiterGroup";
import Loader from "../../../components/loader/Loader";

const Allrecruitrequests = () => {
  const { getRecruitersQuery, deleteRecruiterQuery } = useRecruiters();
  const { addRecruiterMutation, getRecruiterGroupQuery } = useRecruiterGroup();
  const { data, isLoading } = getRecruitersQuery;

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const handleDelete = (id: number) => {
    deleteRecruiterQuery.mutate(id, {
      onSuccess: () => {
        getRecruiterGroupQuery.refetch(); // <--- Important to refresh data

        toast("Request Deleted!", {
          description: "Recruiter request has been deleted successfully.",
        });
      },
    });
  };

  const handlePost = (username: string) => {
    addRecruiterMutation.mutate(username, {
      onSuccess: () => {
        //getRecruiterGroupQuery.refetch();

        toast("User Promoted!", {
          description: "User has been promoted to recruiter successfully.",
        });
      },
    });
  };

  const newcolumns = columns(handleDelete, handlePost);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={newcolumns} filter="username" data={data?.results} />
      <Toaster />
    </div>
  );
};
export default Allrecruitrequests;
