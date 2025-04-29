// frontend/src/pages/dashboard/allInterviews/Columns.tsx

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Link as LinkIcon,
  PlayCircle,
  FileText,
} from "lucide-react";
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
  external_meeting_link: string | null;
  interview_video: string | null;
  analysis_data?: {
    emotions: Record<string, number>;
    confidence: number;
    result: number;
  } | null;
  interview_questions?: Array<{ category: string; question: string }> | null;
};

export const columns = (
  onDelete: (id: number) => void,
  onAnalyze: (id: number) => void,
  onGenerateQuestions: (id: number) => void,
  onViewQuestions: (id: number) => void,
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
    accessorKey: "external_meeting_link",
    header: () => <div className="text-center">Meeting Link</div>,
    cell: ({ row }) => {
      const link = row.getValue("external_meeting_link");

      if (!link) {
        return (
          <div className="text-center text-sm text-gray-500">
            No link provided
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "interview_video",
    header: () => <div className="text-center">Recording</div>,
    cell: ({ row }) => {
      const video = row.original.interview_video;
      const hasVideo = !!video;
      const hasAnalysis = !!row.original.analysis_data;

      if (!hasVideo) {
        return (
          <div className="flex justify-center">
            <span className="text-sm text-gray-500">No video uploaded</span>
          </div>
        );
      }

      return (
        <div className="flex justify-center">
          {hasVideo && !hasAnalysis && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAnalyze(row.original.id)}
              className="flex items-center gap-1"
            >
              <PlayCircle className="h-4 w-4" />
              <span>Analyze Video</span>
            </Button>
          )}
          {hasVideo && hasAnalysis && (
            <div className="flex items-center gap-1 text-green-600">
              <PlayCircle className="h-4 w-4" />
              <span>Analyzed</span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "interview_questions",
    header: () => <div className="text-center">Questions</div>,
    cell: ({ row }) => {
      const hasResume = row.original.application_email !== null; // Assuming all applications with resumes have emails
      const hasQuestions =
        !!row.original.interview_questions &&
        row.original.interview_questions.length > 0;

      if (!hasResume) {
        return (
          <div className="flex justify-center">
            <span className="text-sm text-gray-500">No resume available</span>
          </div>
        );
      }

      return (
        <div className="flex justify-center gap-2">
          {!hasQuestions ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onGenerateQuestions(row.original.id)}
              className="flex items-center gap-1"
            >
              <FileText className="h-4 w-4" />
              <span>Generate Questions</span>
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewQuestions(row.original.id)}
              className="flex items-center gap-1 text-green-600"
            >
              <FileText className="h-4 w-4" />
              <span>View Questions</span>
            </Button>
          )}
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
