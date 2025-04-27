import axios from "axios";

const API_URL = "http://127.0.0.1:8000/auth/users/";

type signupType = {
  email: string;
  username: string;
  password: string;
};

export const postSignup = async (signup: signupType): Promise<signupType> => {
  const { data } = await axios.post(API_URL, signup);
  return data;
};
