'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import type { getOwnedSites, getPublicSites, getSiteById, getSitesPaginated } from '@/lib/actions/site.actions';

// -------------------------
// Types for server functions
// -------------------------
type GetSiteByIdFn = typeof getSiteById;
type GetOwnedSitesFn = typeof getOwnedSites;
type GetPublicSitesFn = typeof getPublicSites;
type GetSitesPaginatedFn = typeof getSitesPaginated;

// -------------------------
// Query key helper
// -------------------------
export const siteListKey = (
  settlementId: string,
  page: number,
  limit: number,
  name: string,  
  types: string[],
  tone: string[],
  favorite: boolean
) => ['sites', settlementId, page, limit, name, types, tone, favorite];

// -------------------------
// Single site query
// -------------------------
export function useGetSiteById(id: Parameters<GetSiteByIdFn>[0] | null) {
  return useQuery<Awaited<ReturnType<GetSiteByIdFn>>, Error>({
    queryKey: ['site', id],
    queryFn: async () => {
      if (!id) throw new Error('No site ID provided');
      const { getSiteById } = await import('@/lib/actions/site.actions');
      return await getSiteById(id);
    },
    enabled: !!id,
  });
}

// -------------------------
// Paginated sites query
// -------------------------
export function usePaginatedSites(
  settlementId: string | null,
  page: number,
  limit: number,
  name: string,
  types: string[],
  tone: string[],
  favorite: boolean
): UseQueryResult<Awaited<ReturnType<GetSitesPaginatedFn>>, Error> {
  return useQuery<Awaited<ReturnType<GetSitesPaginatedFn>>, Error>({
    queryKey: siteListKey(settlementId ?? 'all', page, limit, name, types, tone, favorite),
    queryFn: async () => {
      const { getSitesPaginated } = await import('@/lib/actions/site.actions');
      return await getSitesPaginated(settlementId, page, limit, name, types, undefined, tone, favorite);
    },
    staleTime: 1000 * 60 * 5,
  });
}

// -------------------------
// Public sites query
// -------------------------
export function usePublicSitesQuery(
  params: Omit<Parameters<GetPublicSitesFn>[0], 'isPublic' | 'userId'>
): UseQueryResult<Awaited<ReturnType<GetPublicSitesFn>>, Error> {
  return useQuery<Awaited<ReturnType<GetPublicSitesFn>>, Error>({
    queryKey: ['publicSites', params],
    queryFn: async () => {
      const { getPublicSites } = await import('@/lib/actions/site.actions');
      return await getPublicSites(params);
    },
    staleTime: 1000 * 60 * 5,
  });
}

// -------------------------
// Owned sites query
// -------------------------
export function useOwnedSitesQuery(
  params: Omit<Parameters<GetOwnedSitesFn>[0], 'isPublic'>,
  options?: { isEnabled?: boolean }
): UseQueryResult<Awaited<ReturnType<GetOwnedSitesFn>>, Error> {
  return useQuery<Awaited<ReturnType<GetOwnedSitesFn>>, Error>({
    queryKey: ['ownedSites', params],
    queryFn: async () => {
      const { getOwnedSites } = await import('@/lib/actions/site.actions');
      return await getOwnedSites(params);
    },
    staleTime: 1000 * 60 * 5,
    enabled: options?.isEnabled ?? true,
  });
}
