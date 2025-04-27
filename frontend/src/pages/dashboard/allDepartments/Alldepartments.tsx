import { columns } from "./Columns";
import { DataTable } from "../../../components/table/Datatable";
import useDepartment from "../../../hooks/useDepartment";
import { toast, Toaster } from "sonner";
import Loader from "../../../components/loader/Loader";

const Alldepartments = () => {
  const { departmentQueries, deleteDepartmentMutation } = useDepartment();
  const { data, isLoading } = departmentQueries;
  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const handleDelete = (id: number) => {
    deleteDepartmentMutation.mutate(id, {
      onSuccess: () => {
        departmentQueries.refetch();
        toast("Deleted!", {
          description: "Department has been deleted successfully!",
        });
      },
    });
  };

  const newcolumns = columns(handleDelete);
  console.log(data);
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={newcolumns} filter="title" data={data?.results} />
      <Toaster></Toaster>
    </div>
  );
};
export default Alldepartments;
