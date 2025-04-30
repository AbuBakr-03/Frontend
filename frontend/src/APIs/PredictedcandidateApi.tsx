// frontend/src/APIs/PredictedCandidateApi.tsx

import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/predicted-candidates/";

// Types
// Updated frontend/src/APIs/PredictedCandidateApi.tsx - without timestamps

// Types
type PredictedCandidateType = {
  id: number;
  interview: {
    id: number;
    application: {
      id: number;
      name: string;
      email: string;
      job: {
        id: number;
        title: string;
        company: {
          id: number;
          name: string;
        };
      };
    };
    date: string | null;
    result: {
      id: number;
      title: string;
    };
  };
  status: {
    id: number;
    title: string;
    slug: string;
  };
  evaluation_score: number | null;
  evaluation_data: any | null;
};

type ListPredictedCandidatesType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PredictedCandidateType[];
};

type EvaluationFormData = {
  questions: Array<{
    question: string;
    score: number;
    category: string;
  }>;
  comments: string;
};

// Helper to get auth headers
const getAuthHeader = () => {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// API Functions
export const getPredictedCandidates =
  async (): Promise<ListPredictedCandidatesType> => {
    const { data } = await axios.get(API_URL, { headers: getAuthHeader() });
    return data;
  };

export const getPredictedCandidate = async (
  id: number,
): Promise<PredictedCandidateType> => {
  const { data } = await axios.get(`${API_URL}${id}/`, {
    headers: getAuthHeader(),
  });
  return data;
};

export const submitEvaluation = async (
  id: number,
  evaluationData: EvaluationFormData,
): Promise<{
  success: boolean;
  message: string;
  status: string;
  average_score: number;
}> => {
  const { data } = await axios.post(
    `${API_URL}${id}/evaluate/`,
    { evaluation_data: evaluationData },
    { headers: getAuthHeader() },
  );
  return data;
};
