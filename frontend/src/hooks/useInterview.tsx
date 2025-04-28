// frontend/src/hooks/useInterview.tsx

import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteInterview,
  getInterviews,
  postInterview,
  putInterview,
  analyzeRecording,
} from "../APIs/InterviewApi";

export const useInterview = () => {
  const queryClient = useQueryClient();
  const interviewQueries = useQuery({
    queryKey: ["Interviews"],
    queryFn: getInterviews,
  });
  const deleteInterviewMutation = useMutation({
    mutationFn: deleteInterview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Interviews"] });
    },
  });
  const postInterviewMutation = useMutation({
    mutationFn: postInterview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Interviews"] });
    },
  });
  const putInterviewMutation = useMutation({
    mutationFn: putInterview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Interviews"] });
    },
  });
  const analyzeRecordingMutation = useMutation({
    mutationFn: analyzeRecording,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Interviews"] });
    },
  });
  return {
    interviewQueries,
    deleteInterviewMutation,
    postInterviewMutation,
    putInterviewMutation,
    analyzeRecordingMutation,
  };
};
