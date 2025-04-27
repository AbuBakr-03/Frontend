import axios from "axios";

const API_URL = "http://127.0.0.1:8000/auth/jwt/create/";

type loginType = {
  username: string;
  password: string;
};

type loginResponseType = {
  access: string;
  refresh: string;
  user: {
    id: number;
    email: string;
    is_staff: boolean;
    is_superuser: boolean;
    is_recruiter: boolean;
  };
};

export const postLogin = async (
  login: loginType,
): Promise<loginResponseType> => {
  const { data } = await axios.post(API_URL, login);
  return data;
};
