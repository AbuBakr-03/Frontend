import { useQuery } from "@tanstack/react-query";
import { getInterview } from "../APIs/InterviewApi";

const useGetInterview = (id: number) => {
  const getQueryInterview = useQuery({
    queryKey: ["interview", id],
    queryFn: () => {
      return getInterview(id);
    },
    enabled: !!id,
  });
  return { getQueryInterview };
};

export default useGetInterview;
