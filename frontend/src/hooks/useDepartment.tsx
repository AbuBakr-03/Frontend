import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteDepartment,
  getDepartments,
  postDepartment,
  putDepartment,
} from "../APIs/DepartmentApi";

const useDepartment = () => {
  const queryClient = useQueryClient();
  const departmentQueries = useQuery({
    queryKey: ["Departments"],
    queryFn: getDepartments,
  });
  const deleteDepartmentMutation = useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Departments"] });
    },
  });
  const postDepartmentMutation = useMutation({
    mutationFn: postDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Departments"] });
    },
  });
  const putDepartmentMutation = useMutation({
    mutationFn: putDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Departments"] });
    },
  });
  return {
    departmentQueries,
    postDepartmentMutation,
    putDepartmentMutation,
    deleteDepartmentMutation,
  };
};
export default useDepartment;
