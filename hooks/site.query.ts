import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { getSitesBySettlementPaginated } from '@/lib/actions/site.actions';
import { siteListKey } from '@/lib/util/queryKeys';
import { SiteResponse } from '@/interfaces/site.interface';

export const usePaginatedSites = (
  settlementId: string,
  page: number,
  limit: number,
  types: string[],
  name: string
) => {
  return useQuery<SiteResponse>({
    queryKey: siteListKey(settlementId, page, limit, types, name),
    queryFn: () => getSitesBySettlementPaginated(settlementId, page, limit, types, name),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
};