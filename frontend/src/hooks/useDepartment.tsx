import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteDepartment,
  getDepartments,
  postDepartment,
  putDepartment,
} from "../APIs/DepartmentApi";
import { useAuth } from "../contexts/AuthProvider";

const useDepartment = () => {
  const queryClient = useQueryClient();
  const { isAdmin, isRecruiter } = useAuth();

  const departmentQueries = useQuery({
    queryKey: ["Departments"],
    queryFn: getDepartments,
    enabled: isAdmin || isRecruiter,
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
