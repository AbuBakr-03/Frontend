import { columns } from "./Columns";
import { DataTable } from "../../../components/table/Datatable";
import useCompany from "../../../hooks/useCompany";
import { toast, Toaster } from "sonner";
import Loader from "../../../components/loader/Loader";

const Allcompanies = () => {
  const { companyQueries, deleteCompanyMutation } = useCompany();
  const { data, isLoading } = companyQueries;
  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const handleDelete = (id: number) => {
    deleteCompanyMutation.mutate(id, {
      onSuccess: () => {
        //getQueries.refetch();
        toast("Deleted!", {
          description: "Company has been deleted successfully!",
        });
      },
    });
  };

  const newcolumns = columns(handleDelete);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={newcolumns} filter="name" data={data?.results} />
      <Toaster></Toaster>
    </div>
  );
};
export default Allcompanies;
