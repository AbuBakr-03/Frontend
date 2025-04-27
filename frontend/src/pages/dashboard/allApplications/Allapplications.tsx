import { columns } from "./Columns";
import { DataTable } from "../../../components/table/Datatable";
import { toast, Toaster } from "sonner";
import { useApplication } from "../../../hooks/useApplication";
import Loader from "../../../components/loader/Loader";

const Allapplications = () => {
  const { applicationQueries, deleteApplicationMutation } = useApplication();
  const { data, isLoading } = applicationQueries;
  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const handleDelete = (id: number) => {
    deleteApplicationMutation.mutate(id, {
      onSuccess: () => {
        applicationQueries.refetch();
        toast("Deleted!", {
          description: "Application has been deleted successfully!",
        });
      },
    });
  };

  const newcolumns = columns(handleDelete);

  const newData = data.results.map((x) => ({
    id: x.id,
    name: x.name,
    email: x.email,
    residence: x.residence,
    cover_letter: x.cover_letter,
    status: x.status.title,
  }));

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={newcolumns} filter="name" data={newData} />
      <Toaster></Toaster>
    </div>
  );
};
export default Allapplications;
