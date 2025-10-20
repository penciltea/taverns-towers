'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import type { getOwnedSitesPaginated, getPublicSitesPaginated, getSiteById, getSitesBySettlementPaginated } from '@/lib/actions/site.actions';

// -------------------------
// Types for server functions
// -------------------------
type GetSiteByIdFn = typeof getSiteById;
type GetOwnedSitesPaginatedFn = typeof getOwnedSitesPaginated;
type GetPublicSitesPaginatedFn = typeof getPublicSitesPaginated;

// -------------------------
// Query key helper
// -------------------------
export const siteKeys = {
  all: ['sites'] as const,
  public: (params: Record<string, unknown>) => ['sites', 'public', params] as const,
  owned: (params: Record<string, unknown>) => ['sites', 'owned', params] as const,
  settlement: (settlementId: string | null, params: Record<string, unknown>) =>
    ['sites', 'settlement', settlementId ?? 'wilderness', params] as const,
  single: (id: string | null) => ['site', id] as const,
};

// -------------------------
// Single site query
// -------------------------
export function useGetSiteById(id: Parameters<GetSiteByIdFn>[0] | null) {
  return useQuery<Awaited<ReturnType<GetSiteByIdFn>>, Error>({
    queryKey: siteKeys.single(id),
    queryFn: async () => {
      if (!id) throw new Error('No site ID provided');
      const { getSiteById } = await import('@/lib/actions/site.actions');
      return await getSiteById(id);
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

// -------------------------
// Public Sites (Paginated)
// -------------------------
export function usePublicSitesQuery(
  params: Parameters<GetPublicSitesPaginatedFn>[0]
): UseQueryResult<Awaited<ReturnType<GetPublicSitesPaginatedFn>>, Error> {
  return useQuery<Awaited<ReturnType<GetPublicSitesPaginatedFn>>, Error>({
    queryKey: siteKeys.public(params as Record<string, unknown>),
    queryFn: async () => {
      const { getPublicSitesPaginated } = await import('@/lib/actions/site.actions');
      return await getPublicSitesPaginated(params);
    },
    staleTime: 1000 * 60 * 5,
  });
}

// -------------------------
// Owned Sites (Paginated)
// -------------------------
export function useOwnedSitesQuery(
  params: Parameters<GetOwnedSitesPaginatedFn>[0],
  options?: { isEnabled?: boolean }
): UseQueryResult<Awaited<ReturnType<GetOwnedSitesPaginatedFn>>, Error> {
  return useQuery<Awaited<ReturnType<GetOwnedSitesPaginatedFn>>, Error>({
    queryKey: ['sites', 'owned', JSON.stringify(params)],
    queryFn: async () => {
      const { getOwnedSitesPaginated } = await import('@/lib/actions/site.actions');
      return await getOwnedSitesPaginated(params);
    },
    staleTime: 1000 * 60 * 5,
    enabled: options?.isEnabled ?? true,
  });
}

// -------------------------
// Settlement Sites (Paginated)
// -------------------------
export function useSitesBySettlementQuery(
  settlementId: string | null,
  params: Omit<Parameters<typeof getSitesBySettlementPaginated>[0], 'settlementId'>,
  options?: { isEnabled?: boolean }
): UseQueryResult<Awaited<ReturnType<typeof getSitesBySettlementPaginated>>, Error> {
  // Build the query key using the canonical siteKeys helper
  const queryKey = siteKeys.settlement(settlementId, params);

  return useQuery<Awaited<ReturnType<typeof getSitesBySettlementPaginated>>, Error>({
    queryKey,
    queryFn: async () => {
      if (!settlementId) throw new Error('No settlement ID provided');
      const { getSitesBySettlementPaginated } = await import('@/lib/actions/site.actions');
      return await getSitesBySettlementPaginated({ ...params, settlementId });
    },
    staleTime: 1000 * 60 * 5,
    enabled: options?.isEnabled ?? !!settlementId,
  });
}