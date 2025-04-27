import { getDepartment } from "../APIs/DepartmentApi";
import { useQuery } from "@tanstack/react-query";
const useGetDepartment = (id: number) => {
  const getQueryDept = useQuery({
    queryKey: ["department", id],
    queryFn: () => {
      return getDepartment(id);
    },
    enabled: !!id,
  });
  return { getQueryDept };
};
export default useGetDepartment;
