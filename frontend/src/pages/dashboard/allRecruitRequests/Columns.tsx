import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../../../components/ui/button";
import Actionscell from "../../../components/table2/Actionscell";

export type RecruiterUser = {
  id: number;
  username: string;
};

export const columns = (
  onDelete: (id: number) => void,
  onPost: (username: string) => void,
): ColumnDef<RecruiterUser>[] => [
  {
    accessorKey: "id",
    header: () => <div className="text-center">ID</div>,
  },

  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <div className="grid place-self-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Username
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
  },

  {
    id: "actions",

    cell: ({ row }) => {
      return (
        <Actionscell
          data={row.original}
          onDelete={onDelete}
          onPost={onPost}
        ></Actionscell>
      );
    },
  },
];
