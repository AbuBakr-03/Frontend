// frontend/src/hooks/usePredictedCandidates.tsx

import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  getPredictedCandidates,
  getPredictedCandidate,
  submitEvaluation,
} from "../APIs/PredictedcandidateApi";

export const usePredictedCandidates = () => {
  const queryClient = useQueryClient();

  const predictedCandidatesQuery = useQuery({
    queryKey: ["PredictedCandidates"],
    queryFn: getPredictedCandidates,
  });

  const submitEvaluationMutation = useMutation({
    mutationFn: ({ id, evaluationData }: { id: number; evaluationData: any }) =>
      submitEvaluation(id, evaluationData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["PredictedCandidates"] });
    },
  });

  return {
    predictedCandidatesQuery,
    submitEvaluationMutation,
  };
};

export const useGetPredictedCandidate = (id: number) => {
  const getSingleCandidateQuery = useQuery({
    queryKey: ["predictedCandidate", id],
    queryFn: () => getPredictedCandidate(id),
    enabled: !!id,
  });

  return { getSingleCandidateQuery };
};
