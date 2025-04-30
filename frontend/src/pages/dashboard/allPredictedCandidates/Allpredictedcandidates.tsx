// frontend/src/pages/dashboard/allPredictedCandidates/Allpredictedcandidates.tsx

import { columns, PredictedCandidateType } from "./Columns";
import { DataTable } from "../../../components/table/Datatable";
import { Toaster } from "sonner";
import { usePredictedCandidates } from "../../../hooks/usePredictedCandidates";
import Loader from "../../../components/loader/Loader";

const Allpredictedcandidates = () => {
  const { predictedCandidatesQuery } = usePredictedCandidates();
  const { data, isLoading } = predictedCandidatesQuery;

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  // Transform API data to match the column format
  const transformedData: PredictedCandidateType[] = data.results.map(
    (item) => ({
      id: item.id,
      candidate_name: item.interview.application.name,
      job_title: item.interview.application.job.title,
      company_name: item.interview.application.job.company.name,
      interview_date: item.interview.date,
      status: item.status.title,
      score: item.evaluation_score,
      has_evaluation: item.evaluation_data !== null,
    }),
  );

  const tableColumns = columns();

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-2xl font-bold">Predicted Candidates</h1>
      <DataTable
        columns={tableColumns}
        filter="candidate_name"
        data={transformedData}
      />
      <Toaster />
    </div>
  );
};

export default Allpredictedcandidates;
