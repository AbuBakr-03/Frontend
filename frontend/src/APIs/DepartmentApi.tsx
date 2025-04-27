import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/department/";

type departmentType = {
  id: number;
  title: string;
  slug: string;
};

type newDepartmentType = Omit<departmentType, "id">;

type listDepartmentType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: departmentType[];
};

const getAuthHeader = () => {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getDepartments = async (): Promise<listDepartmentType> => {
  const { data } = await axios.get(API_URL, { headers: getAuthHeader() });
  return data;
};

export const getDepartment = async (id: number): Promise<departmentType> => {
  const { data } = await axios.get(`${API_URL}${id}/`, {
    headers: getAuthHeader(),
  });
  return data;
};

export const deleteDepartment = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}${id}/`, { headers: getAuthHeader() });
};

export const postDepartment = async (
  department: newDepartmentType,
): Promise<departmentType> => {
  const { data } = await axios.post(API_URL, department, {
    headers: getAuthHeader(),
  });
  return data;
};

export const putDepartment = async (
  company: departmentType,
): Promise<departmentType> => {
  const { data } = await axios.put(`${API_URL}${company.id}/`, company, {
    headers: getAuthHeader(),
  });
  return data;
};
