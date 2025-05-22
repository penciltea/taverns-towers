import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { getSitesPaginated } from '@/lib/actions/site.actions';
import { siteListKey } from '@/lib/util/queryKeys';
import { SiteResponse } from '@/interfaces/site.interface';

export const usePaginatedSites = (
  settlementId: string | null,
  page: number,
  limit: number,
  types: string[],
  name: string
) => {
  return useQuery<SiteResponse>({
    queryKey: siteListKey(settlementId ?? 'all', page, limit, types, name),
    queryFn: () => getSitesPaginated(settlementId, page, limit, types, name),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
};