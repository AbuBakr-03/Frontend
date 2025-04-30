import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteCompany,
  getCompanies,
  postCompany,
  putCompany,
} from "../APIs/CompanyApi";
import useGetQuery from "./useGetCompany";
import { useAuth } from "../contexts/AuthProvider";

const useCompany = () => {
  const queryClient = useQueryClient();
  const { isAdmin, isRecruiter } = useAuth();

  const companyQueries = useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
    enabled: isAdmin || isRecruiter,
  });
  const postCompanyMutation = useMutation({
    mutationFn: postCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });
  const putCompanyMutation = useMutation({
    mutationFn: putCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });
  const deleteCompanyMutation = useMutation({
    mutationFn: deleteCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });
  return {
    companyQueries,
    postCompanyMutation,
    putCompanyMutation,
    deleteCompanyMutation,
    useGetQuery,
  };
};
export default useCompany;
