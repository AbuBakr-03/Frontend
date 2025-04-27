import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../../../components/ui/button";
import Actionscell from "../../../components/table/Actionscell";

export type jobtype = {
  id: number;
  title: string;
  location: string;
  company: {
    id: number;
    name: string;
    slug: string;
  };
  department: {
    id: number;
    title: string;
    slug: string;
  };
  responsiblities: string;
  qualification: string;
  nice_to_haves: string;
  end_date: Date;
  recruiter: number;
};

export const columns = (
  onDelete: (id: number) => void,
): ColumnDef<jobtype>[] => [
  {
    accessorKey: "id",
    header: () => <div className="text-center">ID</div>,
  },

  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <div className="grid place-self-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: () => <div className="text-center">Location</div>,
  },
  {
    accessorKey: "responsiblities",
    header: () => <div className="text-center">Responsiblities</div>,
  },
  {
    accessorKey: "qualification",
    header: () => <div className="text-center">Qualifications</div>,
  },
  {
    accessorKey: "nice_to_haves",
    header: () => <div className="text-center">Nice to Haves</div>,
  },
  {
    accessorKey: "end_date",
    header: () => <div className="text-center">End Date</div>,
    cell: ({ row }) => new Date(row.getValue("end_date")).toLocaleDateString(),
  },

  {
    id: "actions",

    cell: ({ row }) => {
      return (
        <Actionscell
          data={row.original}
          onDelete={onDelete}
          path={"job"}
        ></Actionscell>
      );
    },
  },
];
