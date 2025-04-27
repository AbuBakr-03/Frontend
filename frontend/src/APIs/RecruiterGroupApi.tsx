import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/groups/recruiters/";

// TypeScript types
type RecruiterUser = {
  id: number;
  username: string;
};

type ListRecruitersResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: RecruiterUser[]; // <-- Correctly reflect that results is an array
};
// Helper to attach auth token
const getAuthHeader = () => {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// 🚀 API Functions

// GET /api/recruiters/ => Get all recruiters
export const getRecruiterGroupUsers =
  async (): Promise<ListRecruitersResponse> => {
    const { data } = await axios.get(API_URL, { headers: getAuthHeader() });
    return data;
  };

// POST /api/recruiters/ => Add a user to recruiter group
export const addUserToRecruiterGroup = async (
  username: string,
): Promise<void> => {
  console.log(username);
  await axios.post(
    API_URL,
    { username }, // sending username in request body
    { headers: getAuthHeader() },
  );
};

// DELETE /api/recruiters/:userID/ => Remove a user from recruiter group
export const removeUserFromRecruiterGroup = async (
  userID: number,
): Promise<void> => {
  await axios.delete(`${API_URL}${userID}/`, { headers: getAuthHeader() });
};
