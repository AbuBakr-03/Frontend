import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../../../components/ui/button";
import Actionscell from "../../../components/table/Actionscell";

export type interviewType = {
  id: number;
  application_name: string;
  application_job: string;
  application_email: string;
  date: string | null;
  result: string;
};

export const columns = (
  onDelete: (id: number) => void,
): ColumnDef<interviewType>[] => [
  {
    accessorKey: "id",
    header: () => <div className="text-center">ID</div>,
  },
  {
    accessorKey: "application_name",
    header: ({ column }) => {
      return (
        <div className="grid place-self-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Applicant Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "application_job",
    header: () => <div className="text-center">Job Position</div>,
  },
  {
    accessorKey: "application_email",
    header: () => <div className="text-center">Email</div>,
  },
  {
    accessorKey: "date",
    header: () => <div className="text-center">Interview Date</div>,
    cell: ({ row }) => {
      const date = row.getValue("date");
      return (
        <div className="text-center">
          {date ? new Date(date as string).toLocaleString() : "Not scheduled"}
        </div>
      );
    },
  },
  {
    accessorKey: "result",
    header: () => <div className="text-center">Result</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Actionscell
          data={row.original}
          onDelete={onDelete}
          path={"interview"}
        ></Actionscell>
      );
    },
  },
];
