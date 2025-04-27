import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../../../components/ui/button";
import Actionscell from "../../../components/table/Actionscell";

export type applicationType = {
  id: number;
  name: string;
  email: string;
  residence: string;
  cover_letter: string;
  status: string;
};

export const columns = (
  onDelete: (id: number) => void,
): ColumnDef<applicationType>[] => [
  {
    accessorKey: "id",
    header: () => <div className="text-center">ID</div>,
  },

  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="grid place-self-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: () => <div className="text-center">Email</div>,
  },
  {
    accessorKey: "residence",
    header: () => <div className="text-center">Residence</div>,
  },
  {
    accessorKey: "cover_letter",
    header: () => <div className="text-center">Cover Letter</div>,
  },

  {
    id: "actions",

    cell: ({ row }) => {
      return (
        <Actionscell
          data={row.original}
          onDelete={onDelete}
          path={"application"}
        ></Actionscell>
      );
    },
  },
];
