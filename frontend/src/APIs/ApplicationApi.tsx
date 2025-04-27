import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/application/";

type applicationType = {
  id: number;
  name: string;
  email: string;
  residence: string;
  cover_letter: string;
  job: {
    id: number;
    title: string;
    location: string;
    responsiblities: string;
    qualification: string;
    nice_to_haves: string;
    end_date: string;
    department: {
      id: number;
      title: string;
      slug: string;
    };
    company: {
      id: number;
      name: string;
      slug: string;
    };
  };
  status: {
    id: number;
    title: string;
    slug: string;
  };
};

type updateApplicationType = {
  id: number;
  name: string;
  email: string;
  residence: string;
  cover_letter: string;
  job_id: number;
};

type newApplicationType = {
  name: string;
  email: string;
  residence: string;
  cover_letter: string;
  job_id: number;
};

type listApplicationType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: applicationType[];
};

const getAuthHeader = () => {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getApplications = async (): Promise<listApplicationType> => {
  const { data } = await axios.get(API_URL, { headers: getAuthHeader() });
  return data;
};

export const getApplication = async (id: number): Promise<applicationType> => {
  const { data } = await axios.get(`${API_URL}${id}/`, {
    headers: getAuthHeader(),
  });
  return data;
};

export const deleteApplication = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}${id}/`, { headers: getAuthHeader() });
};

export const postApplication = async (
  company: newApplicationType,
): Promise<applicationType> => {
  const { data } = await axios.post(API_URL, company, {
    headers: getAuthHeader(),
  });
  return data;
};

export const putApplication = async (
  company: updateApplicationType,
): Promise<applicationType> => {
  const { data } = await axios.put(`${API_URL}${company.id}/`, company, {
    headers: getAuthHeader(),
  });
  return data;
};
