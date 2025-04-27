import { useQuery } from "@tanstack/react-query";
import { getJob } from "../APIs/JobApi";
const useGetJob = (id: number) => {
  const getQueryJob = useQuery({
    queryKey: ["job", id],
    queryFn: () => {
      return getJob(id);
    },
    enabled: !!id,
  });
  return { getQueryJob };
};
export default useGetJob;
