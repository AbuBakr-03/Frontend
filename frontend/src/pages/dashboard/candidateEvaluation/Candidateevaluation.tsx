// frontend/src/pages/dashboard/candidateEvaluation/CandidateEvaluation.tsx

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Slider } from "../../../components/ui/slider";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import {
  useGetPredictedCandidate,
  usePredictedCandidates,
} from "../../../hooks/usePredictedCandidates";
import Loader from "../../../components/loader/Loader";

// Define the evaluation questions
const evaluationQuestions = [
  {
    id: 1,
    question: "How well did the candidate communicate technical concepts?",
    category: "Communication Skills",
  },
  {
    id: 2,
    question: "How comprehensive was the candidate's technical knowledge?",
    category: "Technical Skills",
  },
  {
    id: 3,
    question: "How effectively did the candidate solve the problems presented?",
    category: "Problem Solving",
  },
  {
    id: 4,
    question: "How well would the candidate fit into the team culture?",
    category: "Cultural Fit",
  },
  {
    id: 5,
    question: "How strong were the candidate's critical thinking skills?",
    category: "Critical Thinking",
  },
  {
    id: 6,
    question:
      "How well did the candidate handle pressure during the interview?",
    category: "Stress Management",
  },
  {
    id: 7,
    question:
      "How aligned is the candidate's experience with the job requirements?",
    category: "Experience Relevance",
  },
  {
    id: 8,
    question: "How strong is the candidate's potential for growth?",
    category: "Growth Potential",
  },
  {
    id: 9,
    question: "How well did the candidate demonstrate leadership qualities?",
    category: "Leadership",
  },
  {
    id: 10,
    question: "Overall, how would you rate this candidate?",
    category: "Overall Assessment",
  },
];

// Define schema for form validation
const formSchema = z.object({
  questions: z.array(
    z.object({
      id: z.number(),
      question: z.string(),
      category: z.string(),
      score: z.number().min(1).max(5),
    }),
  ),
  comments: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const CandidateEvaluation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Get candidate data
  const { getSingleCandidateQuery } = useGetPredictedCandidate(Number(id));
  const { submitEvaluationMutation } = usePredictedCandidates();

  const { data: candidate, isLoading } = getSingleCandidateQuery;

  // Set up form with default values
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questions: evaluationQuestions.map((q) => ({
        ...q,
        score: 3, // Default score is 3 (middle of 1-5 range)
      })),
      comments: "",
    },
  });

  // Check if candidate data is loaded and form is in view mode
  const isViewMode = window.location.pathname.includes("/view");

  useEffect(() => {
    // If in view mode and we have evaluation data, populate the form
    if (isViewMode && candidate?.evaluation_data) {
      form.reset({
        questions: candidate.evaluation_data.questions,
        comments: candidate.evaluation_data.comments || "",
      });
    }
  }, [candidate, form, isViewMode]);

  if (isLoading) {
    return <Loader />;
  }

  if (!candidate) {
    return <div>Candidate not found</div>;
  }

  // Handle form submission
  const onSubmit = (data: FormData) => {
    submitEvaluationMutation.mutate(
      {
        id: Number(id),
        evaluationData: data,
      },
      {
        onSuccess: (response) => {
          toast.success("Evaluation submitted successfully", {
            description: `Candidate ${response.status.toLowerCase()} with score ${response.average_score.toFixed(1)}/5.0`,
          });
          navigate("/dashboard/all-predicted-candidates");
        },
        onError: (error) => {
          console.error("Error submitting evaluation:", error);
          toast.error("Failed to submit evaluation", {
            description: "Please try again",
          });
        },
      },
    );
  };

  return (
    <div className="container mx-auto max-w-3xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {isViewMode ? "Candidate Evaluation Summary" : "Evaluate Candidate"}
          </CardTitle>
          <CardDescription>
            {candidate.interview.application.name} -{" "}
            {candidate.interview.application.job.title} at{" "}
            {candidate.interview.application.job.company.name}
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              {/* Render each question with a slider */}
              {form.watch("questions").map((question, index) => (
                <FormField
                  key={question.id}
                  control={form.control}
                  name={`questions.${index}.score`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="mb-1 flex justify-between">
                        <FormLabel className="font-medium">
                          {question.question}
                        </FormLabel>
                        <span className="text-sm text-gray-500">
                          {field.value}/5
                        </span>
                      </div>
                      <FormControl>
                        <Slider
                          disabled={isViewMode}
                          min={1}
                          max={5}
                          step={1}
                          defaultValue={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                          className="py-4"
                        />
                      </FormControl>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Poor</span>
                        <span>Average</span>
                        <span>Excellent</span>
                      </div>
                      <FormDescription className="mt-1 text-xs">
                        Category: {question.category}
                      </FormDescription>
                    </FormItem>
                  )}
                />
              ))}

              {/* Additional comments */}
              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Comments</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any additional feedback about the candidate..."
                        className="min-h-[100px]"
                        disabled={isViewMode}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            {!isViewMode && (
              <CardFooter className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    navigate("/dashboard/all-predicted-candidates")
                  }
                >
                  Cancel
                </Button>

                <AlertDialog open={open} onOpenChange={setOpen}>
                  <AlertDialogTrigger asChild>
                    <Button type="button">Submit Evaluation</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Submit Candidate Evaluation
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Once submitted, this evaluation will determine if the
                        candidate is hired or rejected. Are you sure you want to
                        continue?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => form.handleSubmit(onSubmit)()}
                      >
                        Submit
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            )}

            {isViewMode && (
              <CardFooter>
                <Button
                  type="button"
                  onClick={() =>
                    navigate("/dashboard/all-predicted-candidates")
                  }
                >
                  Back to Candidates
                </Button>
              </CardFooter>
            )}
          </form>
        </Form>
      </Card>
      <Toaster />
    </div>
  );
};

export default CandidateEvaluation;
