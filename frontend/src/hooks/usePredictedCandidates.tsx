// frontend/src/hooks/usePredictedCandidates.tsx

import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  getPredictedCandidates,
  getPredictedCandidate,
  submitEvaluation,
} from "../APIs/PredictedcandidateApi";
import { useAuth } from "../contexts/AuthProvider";

export const usePredictedCandidates = () => {
  const queryClient = useQueryClient();
  const { isAdmin, isRecruiter } = useAuth();

  const predictedCandidatesQuery = useQuery({
    queryKey: ["PredictedCandidates"],
    queryFn: getPredictedCandidates,
    enabled: isAdmin || isRecruiter,
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
