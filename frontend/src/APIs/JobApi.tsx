import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/job/";

type jobType = {
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
  responsiblities: string;
  qualification: string;
  nice_to_haves: string;
  end_date: Date;
  recruiter: number;
};

type newJobType = Omit<updateJobType, "id">;

type updateJobType = {
  id: number;
  title: string;
  location: string;
  company_id: number;
  department_id: number;
  responsiblities: string;
  qualification: string;
  nice_to_haves: string;
  end_date: Date;
  recruiter: number;
};

type listJobType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: jobType[];
};

const getAuthHeader = () => {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getJobs = async (): Promise<listJobType> => {
  const { data } = await axios.get(API_URL, {
    headers: getAuthHeader(),
  });
  return data;
};

export const getJob = async (id: number): Promise<jobType> => {
  const { data } = await axios.get(`${API_URL}${id}/`, {
    headers: getAuthHeader(),
  });
  return data;
};

export const deleteJob = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}${id}/`, {
    headers: getAuthHeader(),
  });
};

export const postJob = async (job: newJobType): Promise<jobType> => {
  const { data } = await axios.post(API_URL, job, {
    headers: getAuthHeader(),
  });
  return data;
};

export const putJob = async (job: updateJobType): Promise<jobType> => {
  const { data } = await axios.put(`${API_URL}${job.id}/`, job, {
    headers: getAuthHeader(),
  });
  return data;
};
