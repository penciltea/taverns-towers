'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import type { getRecentActivity } from '@/lib/actions/user.actions';

type GetRecentActivityFn = typeof getRecentActivity;

// -------------------------
// Recent activity query
// -------------------------
export const useRecentActivityQuery = (
  limit = 5
): UseQueryResult<Awaited<ReturnType<GetRecentActivityFn>>, Error> => {
  return useQuery<Awaited<ReturnType<GetRecentActivityFn>>, Error>({
    queryKey: ['recentActivity', limit],
    queryFn: async () => {
      const { getRecentActivity } = await import('@/lib/actions/user.actions') as { getRecentActivity: GetRecentActivityFn };
      return await getRecentActivity(limit);
    },
    staleTime: 1000 * 60 * 2,
  });
};
