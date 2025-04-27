import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../../../components/ui/button";
import Actionscell from "../../../components/table/Actionscell";

export type company = {
  id: number;
  name: string;
  slug: string;
};

export const columns = (
  onDelete: (id: number) => void,
): ColumnDef<company>[] => [
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
    accessorKey: "slug",
    header: () => <div className="text-center">Slug</div>,
  },

  {
    id: "actions",

    cell: ({ row }) => {
      return (
        <Actionscell
          data={row.original}
          onDelete={onDelete}
          path={"company"}
        ></Actionscell>
      );
    },
  },
];
