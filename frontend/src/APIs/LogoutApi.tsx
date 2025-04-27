import axios from "axios";

const API_URL = "http://127.0.0.1:8000/auth/jwt/logout/";

const getAuthHeader = () => {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const postLogout = async () => {
  const refresh_token = localStorage.getItem("refresh_token");
  if (!refresh_token) {
    throw new Error("No refresh token found");
  }
  const { data } = await axios.post(
    API_URL,
    { refresh: refresh_token }, // Body with refresh token
    { headers: getAuthHeader() }, // Headers with access token
  );
  return data;
};
