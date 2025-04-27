import { useQuery } from "@tanstack/react-query";
import { getApplication } from "../APIs/ApplicationApi";
const useGetApplication = (id: number) => {
  const getQueryApplication = useQuery({
    queryKey: ["application", id],
    queryFn: () => {
      return getApplication(id);
    },
    enabled: !!id,
  });
  return { getQueryApplication };
};
export default useGetApplication;
