import { useQuery } from '@tanstack/react-query';
import { getSiteById, getSitesPaginated } from '@/lib/actions/site.actions';
import { siteListKey } from '@/lib/util/queryKeys';
import { SiteResponse } from '@/interfaces/site.interface';

export const usePaginatedSites = (
  settlementId: string | null,
  page: number,
  limit: number,
  name: string,
  types: string[],
) => {
  return useQuery<SiteResponse>({
    queryKey: siteListKey(settlementId ?? 'all', page, limit, name, types),
    queryFn: () => getSitesPaginated(settlementId, page, limit, name, types),
    staleTime: 1000 * 60 * 5,
  });
};

export const useSiteQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: ['site', id],
    queryFn: () => {
      if (!id) throw new Error('No site ID provided');
      return getSiteById(id);
    },
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  });
};