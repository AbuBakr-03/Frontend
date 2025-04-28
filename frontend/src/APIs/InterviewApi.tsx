import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/interview/";

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
  meeting_link: string | null;
  analysis_data?: {
    emotions: Record<string, number>;
    confidence: number;
    result: number;
  } | null;
};

type newInterviewType = {
  application_id: number;
  date?: string | null;
  generate_link?: boolean;
};

type updateInterviewType = {
  id: number;
  application_id: number;
  date?: string | null;
  generate_link?: boolean;
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
  const { data } = await axios.post(API_URL, interview, {
    headers: getAuthHeader(),
  });
  return data;
};

export const putInterview = async (
  interview: updateInterviewType,
): Promise<interviewType> => {
  const { data } = await axios.put(`${API_URL}${interview.id}/`, interview, {
    headers: getAuthHeader(),
  });
  return data;
};

export const generateMeetingLink = async (
  id: number,
): Promise<{ meeting_link: string }> => {
  const { data } = await axios.post(
    `${API_URL}${id}/generate-meeting/`,
    {},
    { headers: getAuthHeader() },
  );
  return data;
};

// New function to analyze a recording
// Assuming this is a utility function to get authorization headers

export const analyzeRecording = async (
  id: number,
  recordingData: string,
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
      { recording_data: recordingData, interview_id: id },
      {
        headers: {
          ...getAuthHeader(),
          "Content-Type": "application/json",
        },
      },
    );

    // Log the successful response
    console.log("Analysis response received:", response.data);

    return response.data;
  } catch (error: unknown) {
    // Type-check the error and log it
    if (axios.isAxiosError(error)) {
      // Axios-specific error handling
      console.error("Axios error occurred during recording analysis:", error);
      if (error.response) {
        console.error("Error response from API:", error.response.data);

        // Check for the specific error related to librosa
        if (
          error.response.data.error &&
          error.response.data.error.includes("No librosa attribute output")
        ) {
          console.error("Librosa processing error:", error.response.data.error);
          throw new Error(
            "Failed to process the recording. The audio analysis could not be completed.",
          );
        }

        throw new Error(
          `API Error: ${error.response.data.error || "Unknown error"}`,
        );
      } else if (error.request) {
        console.error("No response received from API:", error.request);
        throw new Error(
          "No response from API. Please check your network connection.",
        );
      } else {
        console.error("Error setting up the request:", error.message);
        throw new Error(`Error: ${error.message}`);
      }
    } else if (error instanceof Error) {
      // Generic Error object handling
      console.error("Error occurred during recording analysis:", error.message);
      throw new Error(error.message);
    } else {
      // Handle unknown error type
      console.error("An unknown error occurred during recording analysis");
      throw new Error("An unknown error occurred. Please try again.");
    }
  }
};


// Function to find an interview by meeting ID
export const findInterviewByMeetingId = async (
  meetingId: string,
): Promise<interviewType | null> => {
  try {
    const { data } = await axios.get(`${API_URL}?meeting_id=${meetingId}`, {
      headers: getAuthHeader(),
    });

    if (data.results && data.results.length > 0) {
      return data.results[0];
    }
    return null;
  } catch (error) {
    console.error("Error finding interview by meeting ID:", error);
    return null;
  }
};
