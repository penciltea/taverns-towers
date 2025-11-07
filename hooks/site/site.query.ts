'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import type { getOwnedSites, getPublicSites, getSiteById, getSitesBySettlement } from '@/lib/actions/site.actions';
import { useCampaignStore } from '@/store/campaignStore';

// -------------------------
// Types for server functions
// -------------------------
type GetSiteByIdFn = typeof getSiteById;
type GetOwnedSitesFn = typeof getOwnedSites;
type GetSitesBySettlementFn = typeof getSitesBySettlement;
type GetPublicSitesFn = typeof getPublicSites;



// -------------------------
// Query key helper
// -------------------------
export const siteKeys = {
  all: ['sites'] as const,

  lists: () => [...siteKeys.all, 'list'] as const,
  list: (params?: Record<string, unknown>) =>
    [...siteKeys.lists(), { ...params }] as const,

  public: (params?: Record<string, unknown>) =>
    [...siteKeys.all, 'public', { ...params }] as const,

  owned: (params?: Record<string, unknown>) =>
    [...siteKeys.all, 'owned', { ...params }] as const,

  campaign: (campaignId?: string, params?: Record<string, unknown>) =>
    [...siteKeys.all, 'campaign', campaignId ?? 'none', { ...params }] as const,

  settlement: (settlementId?: string, params?: Record<string, unknown>) =>
    [...siteKeys.all, 'settlement', settlementId ?? 'wilderness', { ...params }] as const,

  detail: (id?: string | null) =>
    [...siteKeys.all, 'detail', id ?? 'unknown'] as const,
};



// -------------------------
// Single site query
// -------------------------
export function useGetSiteById(id: Parameters<GetSiteByIdFn>[0] | null){
  return useQuery<Awaited<ReturnType<GetSiteByIdFn>>, Error>({
    queryKey: siteKeys.detail(id),
    queryFn: async () => {
      if (!id) throw new Error('No site ID provided');
      const { getSiteById } = await import('@/lib/actions/site.actions');
      return await getSiteById(id);
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  })
}



// -------------------------
// Owned sites query
// -------------------------
export function useOwnedSitesQuery(
  params: Omit<Parameters<GetOwnedSitesFn>[0], 'isPublic'>,
  options?: { isEnabled?: boolean }
): UseQueryResult<Awaited<ReturnType<GetOwnedSitesFn>>, Error>{
  const { selectedCampaign } = useCampaignStore();

  const mergedParams = {
    ...params,
    campaignId: selectedCampaign?._id || undefined,
  };

  return useQuery<Awaited<ReturnType<GetOwnedSitesFn>>, Error>({
    queryKey: selectedCampaign
      ? siteKeys.campaign(selectedCampaign._id, mergedParams)
      : siteKeys.owned(mergedParams),
    queryFn: async () => {
      if (selectedCampaign) {
        const { getCampaignSites } = await import("@/lib/actions/site.actions");
        return getCampaignSites(params, selectedCampaign._id);
      } else {
        const { getOwnedSites } = await import("@/lib/actions/site.actions");
        return getOwnedSites(params);
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: options?.isEnabled ?? true,
  });
}


// -------------------------
// Settlement sites query
// -------------------------
export function useSitesBySettlementQuery(
  settlementId: string,
  params: Omit<Parameters<GetSitesBySettlementFn>[0], 'isPublic'>,
  options?: { isEnabled?: boolean }
): UseQueryResult<Awaited<ReturnType<GetSitesBySettlementFn>>, Error>{
  const { selectedCampaign } = useCampaignStore();

  const mergedParams = {
    ...params,
    campaignId: selectedCampaign?._id || undefined,
  };

  return useQuery<Awaited<ReturnType<GetSitesBySettlementFn>>, Error>({
    queryKey: selectedCampaign
      ? siteKeys.campaign(selectedCampaign._id, mergedParams)
      : siteKeys.settlement(settlementId, mergedParams),
    queryFn: async () => {
      if (selectedCampaign) {
        const { getCampaignSites } = await import("@/lib/actions/site.actions");
        return getCampaignSites(params, selectedCampaign._id, settlementId);
      } else {
        const { getSitesBySettlement } = await import("@/lib/actions/site.actions");
        return getSitesBySettlement(params, settlementId);
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: options?.isEnabled ?? true,
  });
}


// -------------------------
// Public sites query
// -------------------------
export function usePublicSitesQuery(
  params: Parameters<GetPublicSitesFn>[0]
): UseQueryResult<Awaited<ReturnType<GetPublicSitesFn>>, Error>{
  return useQuery<Awaited<ReturnType<GetPublicSitesFn>>, Error>({
    queryKey: siteKeys.public(params), 
    queryFn: async () => {
      const { getPublicSites } = await import("@/lib/actions/site.actions");
      return getPublicSites(params);
    },
    staleTime: 1000 * 60 * 5
  })
}