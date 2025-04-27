import { useQuery } from "@tanstack/react-query";
import { getCompany } from "../APIs/CompanyApi";

const useGetQuery = (id: number) => {
  const getQuery = useQuery({
    queryKey: ["company", id],
    queryFn: () => {
      return getCompany(id);
    },
    enabled: !!id,
  });

  return { getQuery};
};
export default useGetQuery;
