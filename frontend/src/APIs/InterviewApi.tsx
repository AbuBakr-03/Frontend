// frontend/src/APIs/InterviewApi.tsx

import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/interview/";

// frontend/src/APIs/InterviewApi.tsx
// Make sure your interviewType includes the interview_questions property:

type interviewType = {
  id: number;
  application: {
    id: number;
    name: string;
    email: string;
    residence: string;
    cover_letter: string;
    match_score: number | null;
    job: {
      id: number;
      title: string;
      location: string;
      company: {
        id: number;
        name: string;
        slug: string;
      };
      department: {
        id: number;
        title: string;
        slug: string;
      };
    };
    status: {
      id: number;
      title: string;
      slug: string;
    };
  };
  date: string | null;
  result: {
    id: number;
    title: string;
    slug: string;
  };
  external_meeting_link: string | null;
  interview_video: string | null;
  analysis_data?: {
    emotions: Record<string, number>;
    confidence: number;
    result: number;
  } | null;
  interview_questions?: Array<{ category: string; question: string }> | null;
};
type newInterviewType = {
  application_id: number;
  date?: string | null;
  external_meeting_link?: string | null;
  interview_video?: File | null;
};

type updateInterviewType = {
  id: number;
  application_id: number;
  date?: string | null;
  external_meeting_link?: string | null;
  interview_video?: File | null;
};

type listInterviewType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: interviewType[];
};

const getAuthHeader = () => {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getInterviews = async (): Promise<listInterviewType> => {
  const { data } = await axios.get(API_URL, { headers: getAuthHeader() });
  return data;
};

export const getInterview = async (id: number): Promise<interviewType> => {
  const { data } = await axios.get(`${API_URL}${id}/`, {
    headers: getAuthHeader(),
  });
  return data;
};

export const deleteInterview = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}${id}/`, { headers: getAuthHeader() });
};

export const postInterview = async (
  interview: newInterviewType,
): Promise<interviewType> => {
  // Handle file upload with FormData
  const formData = new FormData();
  formData.append("application_id", interview.application_id.toString());

  if (interview.date) {
    formData.append("date", interview.date);
  }

  if (interview.external_meeting_link) {
    formData.append("external_meeting_link", interview.external_meeting_link);
  }

  if (interview.interview_video) {
    formData.append("interview_video", interview.interview_video);
  }

  const { data } = await axios.post(API_URL, formData, {
    headers: {
      ...getAuthHeader(),
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const putInterview = async (
  interview: updateInterviewType,
): Promise<interviewType> => {
  // Handle file upload with FormData
  const formData = new FormData();
  formData.append("application_id", interview.application_id.toString());

  if (interview.date) {
    formData.append("date", interview.date);
  }

  if (interview.external_meeting_link) {
    formData.append("external_meeting_link", interview.external_meeting_link);
  }

  if (interview.interview_video) {
    formData.append("interview_video", interview.interview_video);
  }

  const { data } = await axios.put(`${API_URL}${interview.id}/`, formData, {
    headers: {
      ...getAuthHeader(),
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

// Function to analyze a previously uploaded video
export const analyzeRecording = async (
  id: number,
): Promise<{
  success: boolean;
  message: string;
  emotions: Record<string, number>;
  confidence: number;
  result_id: number;
  result_title: string;
}> => {
  console.log("Starting analysis for interview ID:", id);

  try {
    const response = await axios.post(
      `${API_URL}${id}/analyze-recording/`,
      { interview_id: id },
      {
        headers: {
          ...getAuthHeader(),
          "Content-Type": "application/json",
        },
      },
    );

    console.log("Analysis response received:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error occurred during recording analysis:", error);
    throw new Error("An error occurred during analysis. Please try again.");
  }
};

// frontend/src/APIs/InterviewApi.tsx - Add this function

// Function to generate interview questions from resume
export const generateInterviewQuestions = async (
  id: number,
): Promise<{
  success: boolean;
  message: string;
  questions: Array<{ category: string; question: string }>;
}> => {
  console.log("Starting question generation for interview ID:", id);

  try {
    const response = await axios.post(
      `${API_URL}${id}/generate-questions/`,
      { interview_id: id },
      {
        headers: {
          ...getAuthHeader(),
          "Content-Type": "application/json",
        },
      },
    );

    console.log("Questions generated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error occurred during question generation:", error);
    throw new Error(
      "An error occurred while generating questions. Please try again.",
    );
  }
};
