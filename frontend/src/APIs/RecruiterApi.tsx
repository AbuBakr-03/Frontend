import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/recruiters/";

type recruiterType = {
  id: number;
  username: string;
};

type listRecruiterType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: recruiterType[];
};

const getAuthHeader = () => {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getRecruiterRequests = async (): Promise<listRecruiterType> => {
  const { data } = await axios.get(API_URL, { headers: getAuthHeader() });
  return data;
};

export const deleteRecruiterRequest = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}${id}/`, { headers: getAuthHeader() });
};

export const postRecruiterRequest = async () => {
  const { data } = await axios.post(
    API_URL,
    {},
    {
      headers: getAuthHeader(),
    },
  );
  return data;
};
