import { columns } from "./Columns";
import { DataTable } from "../../../components/table/Datatable";
import { useJob } from "../../../hooks/useJob";
import { toast, Toaster } from "sonner";
import Loader from "../../../components/loader/Loader";

const Alljobs = () => {
  const { jobQueries, deleteJobMutation } = useJob();
  const { data, isLoading } = jobQueries;
  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const handleDelete = (id: number) => {
    deleteJobMutation.mutate(id, {
      onSuccess: () => {
        jobQueries.refetch();
        toast("Deleted!", {
          description: "Job has been deleted successfully!",
        });
      },
    });
  };

  const newcolumns = columns(handleDelete);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={newcolumns} filter="title" data={data?.results} />
      <Toaster></Toaster>
    </div>
  );
};
export default Alljobs;
