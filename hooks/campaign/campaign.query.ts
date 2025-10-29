'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import type { getCampaigns, getCampaignById, getOwnedCampaigns, getPublicCampaigns } from '@/lib/actions/campaign.actions';

// -------------------------
// Types for server functions
// -------------------------
type GetCampaignsFn = typeof getCampaigns;
type GetCampaignByIdFn = typeof getCampaignById;
type GetOwnedCampaignsFn = typeof getOwnedCampaigns;
type GetPublicCampaignsFn = typeof getPublicCampaigns;


// -------------------------
// Campaigns list query
// -------------------------

export function useCampaignsQuery(
    params: Parameters<GetCampaignsFn>[0]
): UseQueryResult<Awaited<ReturnType<GetCampaignsFn>>, Error> {
    return useQuery<Awaited<ReturnType<GetCampaignsFn>>, Error>({
        queryKey: ['campaigns', params],
        queryFn: async () => {
            const { getCampaigns } = await import('@/lib/actions/campaign.actions');
            return await getCampaigns(params);
        },
        staleTime: 1000 * 60 * 5,
    });
}

// -------------------------
// Single campaign query
// -------------------------
export function useGetCampaignById(
  campaignId: Parameters<GetCampaignByIdFn>[0] | null
): UseQueryResult<Awaited<ReturnType<GetCampaignByIdFn>>, Error> {
  return useQuery<Awaited<ReturnType<GetCampaignByIdFn>>, Error>({
    queryKey: ['campaign', campaignId],
    queryFn: async () => {
      if (!campaignId) throw new Error('No campaign ID provided');
      const { getCampaignById } = await import('@/lib/actions/campaign.actions');
      return await getCampaignById(campaignId);
    },
    enabled: !!campaignId,
  });
}

// -------------------------
// Public campaigns query
// -------------------------
export function usePublicCampaignsQuery(
  params: Omit<Parameters<GetCampaignsFn>[0], 'isPublic' | 'userId'>
): UseQueryResult<Awaited<ReturnType<GetPublicCampaignsFn>>, Error> {
  return useQuery<Awaited<ReturnType<GetPublicCampaignsFn>>, Error>({
    queryKey: ['publicCampaigns', params],
    queryFn: async () => {
      const { getPublicCampaigns } = await import('@/lib/actions/campaign.actions');
      return await getPublicCampaigns(params);
    },
    staleTime: 1000 * 60 * 5,
  });
}

// -------------------------
// Owned campaigns query
// -------------------------
export function useOwnedCampaignsQuery(
  params: Omit<Parameters<GetCampaignsFn>[0], 'isPublic'>,
  options?: { isEnabled?: boolean }
): UseQueryResult<Awaited<ReturnType<GetOwnedCampaignsFn>>, Error> {
  return useQuery<Awaited<ReturnType<GetOwnedCampaignsFn>>, Error>({
    queryKey: ['ownedCampaigns', params],
    queryFn: async () => {
      const { getOwnedCampaigns } = await import('@/lib/actions/campaign.actions');
      return await getOwnedCampaigns(params);
    },
    staleTime: 1000 * 60 * 5,
    enabled: options?.isEnabled ?? true,
  });
}
