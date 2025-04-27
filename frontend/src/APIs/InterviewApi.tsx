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
};

type newInterviewType = {
  application_id: number;
  date?: string | null;
};

type updateInterviewType = {
  id: number;
  application_id: number;
  date?: string | null;
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
