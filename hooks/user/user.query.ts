import { getRecentActivity } from "@/lib/actions/user.actions";
import { useQuery } from "@tanstack/react-query";

export const useRecentActivityQuery = (limit = 5) => {
  return useQuery({
    queryKey: ['recentActivity', limit],
    queryFn: () => getRecentActivity(limit),
    staleTime: 1000 * 60 * 2,
  });
};