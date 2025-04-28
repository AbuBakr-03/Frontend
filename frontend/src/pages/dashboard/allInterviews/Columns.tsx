import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Video, Link as LinkIcon, Copy } from "lucide-react";
import { Button } from "../../../components/ui/button";
import Actionscell from "../../../components/table/Actionscell";
import { toast } from "sonner";

export type interviewType = {
  id: number;
  application_name: string;
  application_job: string;
  application_email: string;
  date: string | null;
  result: string;
  meeting_link: string | null;
  analysis_data?: {
    emotions: Record<string, number>;
    confidence: number;
    result: number;
  } | null;
};

export const columns = (
  onDelete: (id: number) => void,
  onGenerateLink: (id: number) => void,
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
    cell: ({ row }) => {
      const result = row.getValue("result") as string;
      const analysisData = row.original.analysis_data;

      // Determine the color based on the result
      let textColor = "text-gray-600"; // Default
      if (
        result.toLowerCase().includes("hired") ||
        result.toLowerCase().includes("approved")
      ) {
        textColor = "text-green-600";
      } else if (result.toLowerCase().includes("rejected")) {
        textColor = "text-red-600";
      } else if (result.toLowerCase().includes("pending")) {
        textColor = "text-yellow-600";
      }

      return (
        <div className="text-center">
          <span className={`font-medium ${textColor}`}>{result}</span>
          {analysisData && (
            <div className="mt-1 text-xs text-gray-500">
              Confidence: {analysisData.confidence.toFixed(1)}%
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "meeting_link",
    header: () => <div className="text-center">Interview Link</div>,
    cell: ({ row }) => {
      const link = row.getValue("meeting_link");

      if (!link) {
        return (
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onGenerateLink(row.original.id)}
              className="flex items-center gap-1"
            >
              <Video className="h-4 w-4" />
              <span>Generate Link</span>
            </Button>
          </div>
        );
      }

      return (
        <div className="flex items-center justify-center gap-2">
          <a
            href={link as string}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline"
          >
            <LinkIcon className="h-4 w-4" />
            <span>Join Meeting</span>
          </a>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              navigator.clipboard.writeText(link as string);
              toast.success("Link copied to clipboard!");
            }}
          >
            <Copy className="h-4 w-4" />
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
          path={"interview"}
        ></Actionscell>
      );
    },
  },
];
