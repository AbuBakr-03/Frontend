import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/company/";

type companyType = {
  id: number;
  name: string;
  slug: string;
};

type newCompanyType = Omit<companyType, "id">;

type listCompanyType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: companyType[];
};

const getAuthHeader = () => {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getCompanies = async (): Promise<listCompanyType> => {
  const { data } = await axios.get(API_URL, { headers: getAuthHeader() });
  return data;
};

export const getCompany = async (id: number): Promise<companyType> => {
  const { data } = await axios.get(`${API_URL}${id}/`, {
    headers: getAuthHeader(),
  });
  return data;
};

export const deleteCompany = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}${id}/`, { headers: getAuthHeader() });
};

export const postCompany = async (
  company: newCompanyType,
): Promise<companyType> => {
  const { data } = await axios.post(API_URL, company, {
    headers: getAuthHeader(),
  });
  return data;
};

export const putCompany = async (
  company: companyType,
): Promise<companyType> => {
  const { data } = await axios.put(`${API_URL}${company.id}/`, company, {
    headers: getAuthHeader(),
  });
  return data;
};
