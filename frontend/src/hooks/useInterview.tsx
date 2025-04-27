import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteInterview,
  getInterviews,
  postInterview,
  putInterview,
  generateMeetingLink,
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
  const generateMeetingLinkMutation = useMutation({
    mutationFn: generateMeetingLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Interviews"] });
    },
  });
  return {
    interviewQueries,
    deleteInterviewMutation,
    postInterviewMutation,
    putInterviewMutation,
    generateMeetingLinkMutation,
  };
};
