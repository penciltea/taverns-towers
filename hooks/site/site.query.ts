import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getOwnedSites, getPublicSites, getSiteById, getSites, getSitesPaginated } from '@/lib/actions/site.actions';
import { siteListKey } from '@/lib/util/queryKeys';
import { SiteResponse } from '@/interfaces/site.interface';

export function useGetSiteById(id: string) {
  return useQuery({
    queryKey: ['site', id],
    queryFn: () => getSiteById(id),
    enabled: !!id,
  });
}

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

export const usePublicSitesQuery = (
  params: Omit<Parameters<typeof getSites>[0], 'isPublic' | 'userId'>
): UseQueryResult<SiteResponse> => {
  return useQuery<SiteResponse, Error, SiteResponse, [string, typeof params]>({
    queryKey: ['publicSites', params],
    queryFn: () => getPublicSites(params),
    staleTime: 1000 * 60 * 5,
  });
};

export const useOwnedSitesQuery = (
  params: Omit<Parameters<typeof getSites>[0], 'isPublic'>,
  options?: {
    isEnabled: boolean;
  }
): UseQueryResult<SiteResponse> => {
  return useQuery<SiteResponse, Error>({
    queryKey: ['ownedSites', params],
    queryFn: () => getOwnedSites(params),
    staleTime: 1000 * 60 * 5,
    enabled: options?.isEnabled ?? true,
  });
};