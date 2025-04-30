// frontend/src/pages/dashboard/allPredictedCandidates/Columns.tsx

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ClipboardCheck } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";

export type PredictedCandidateType = {
  id: number;
  candidate_name: string;
  job_title: string;
  company_name: string;
  interview_date: string | null;
  status: string;
  score: number | null;
  has_evaluation: boolean;
};

export const columns = (): ColumnDef<PredictedCandidateType>[] => [
  {
    accessorKey: "id",
    header: () => <div className="text-center">ID</div>,
  },
  {
    accessorKey: "candidate_name",
    header: ({ column }) => {
      return (
        <div className="grid place-self-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Candidate Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "job_title",
    header: () => <div className="text-center">Position</div>,
  },
  {
    accessorKey: "company_name",
    header: () => <div className="text-center">Company</div>,
  },
  {
    accessorKey: "interview_date",
    header: () => <div className="text-center">Interview Date</div>,
    cell: ({ row }) => {
      const date = row.getValue("interview_date");
      return (
        <div className="text-center">
          {date
            ? new Date(date as string).toLocaleDateString()
            : "Not scheduled"}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      // Style based on status
      let statusColor = "text-yellow-600";
      if (status.toLowerCase() === "hired") {
        statusColor = "text-green-600";
      } else if (status.toLowerCase() === "rejected") {
        statusColor = "text-red-600";
      }

      return (
        <div className={`text-center font-medium ${statusColor}`}>{status}</div>
      );
    },
  },
  {
    accessorKey: "score",
    header: () => <div className="text-center">Score</div>,
    cell: ({ row }) => {
      const score = row.getValue("score") as number | null;
      return (
        <div className="text-center">
          {score !== null ? `${score.toFixed(1)}/5.0` : "Not evaluated"}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const id = row.original.id;
      const hasEvaluation = row.original.has_evaluation;
      const status = row.original.status.toLowerCase();

      // If already evaluated, show a view button
      if (hasEvaluation) {
        return (
          <div className="flex justify-center">
            <Link
              to={`/dashboard/candidate-evaluation/${id}/view`}
              className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
            >
              <ClipboardCheck className="h-3 w-3" />
              View Evaluation
            </Link>
          </div>
        );
      }

      // If pending evaluation, show an evaluate button
      if (status === "pending") {
        return (
          <div className="flex justify-center">
            <Link
              to={`/dashboard/candidate-evaluation/${id}`}
              className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 hover:bg-amber-100"
            >
              <ClipboardCheck className="h-3 w-3" />
              Evaluate
            </Link>
          </div>
        );
      }

      return null;
    },
  },
];
